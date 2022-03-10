<template>
  <div>
    <hp-modal
      :isOpen="isAddCandidateModalOpen"
      @close="isAddCandidateModalOpen = false"
    >
      <candidate-modal
        @close="isAddCandidateModalOpen = false"
        :opening="opening"
      />
    </hp-modal>
    <form
      class="edit-openings"
      v-if="!isLoading"
      @submit.prevent="handleContextFormSave"
    >
      <div>
        <div class="edit-openings__edit-container">
          <h3 class="edit-openings__edit-container__title">Edit opening</h3>
          <p class="edit-openings__edit-container__subtitle">
            Main information for your openings
          </p>
          <hp-input
            @input="debouncedSubmit"
            label="Name"
            name="name"
          ></hp-input>
          <hp-textarea
            @input="debouncedSubmit"
            label="Description"
            name="description"
          ></hp-textarea>
          <hp-image-selector
            class="edit-openings__edit-container__cover-selector"
            label="Cover"
            name="artwork"
            @input="debouncedSubmit"
          ></hp-image-selector>
          <div class="edit-openings__edit-container__archive">
            <hp-button
              icon="archive"
              label="Archive opening"
              danger
              @handleClick="archiveOpening"
            ></hp-button>
          </div>
        </div>
      </div>
      <div class="edit-openings__empty-state" v-if="templates.length === 0">
        <mic-check />
        <p class="edit-openings__empty-state__title">Mic check! One, two...</p>
        <p class="edit-openings__empty-state__subtitle">
          Looking a bit empty here, please add an interview
        </p>
        <hp-button
          :to="`/opening/${route.params.openingRef}/edit/add-interview`"
          label="Add interview"
        ></hp-button>
      </div>
      <div class="edit-openings__interview-container" v-else>
        <h2 class="edit-openings__interview-container__title">Interviews</h2>
        <p class="edit-openings__interview-container__subtitle">
          View and manage all interviews
        </p>
        <div class="edit-openings__interview-container__grid">
          <hp-interview-card isAddCard></hp-interview-card>
          <draggable
            v-model="templates"
            tag="transition-group"
            item-key="reference"
            handle=".hp-interview-card__badge-container__handle"
            @change="handleDragChange"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element, index }">
              <hp-interview-card
                :template="element"
                :index="index + 1"
                :key="element.reference"
                @handleRemove="handleRemoveInterview"
              ></hp-interview-card>
            </template>
          </draggable>
        </div>
      </div>
      <teleport to="#teleport-target-header">
        <hp-button
          class="edit-openings__teleport-button"
          icon="user"
          @click="isAddCandidateModalOpen = true"
          label="Add candidate"
        ></hp-button>
        <div
          ref="overviewArea"
          class="
            edit-openings__teleport-button
            edit-openings__teleport-button--overview
          "
        >
          <hp-button
            @handleClick="isOverviewFlyoutOpen = !isOverviewFlyoutOpen"
            icon="file"
          >
          </hp-button>
          <transition name="flyout-transition">
            <div
              v-if="isOverviewFlyoutOpen"
              class="edit-interview__overview-button__flyout"
            >
              <div class="edit-interview__overview-button__flyout__header">
                Overview
              </div>
              <div class="edit-interview__overview-button__flyout__header">
                Levels
                <ol class="edit-interview__overview-button__skills">
                  <hp-badge-tag
                    v-for="level in opening.statistics.jobLevels"
                    :quantity="level.quantity"
                    :label="level.value.name"
                  ></hp-badge-tag>
                </ol>
              </div>
              <div class="edit-interview__overview-button__flyout__header">
                Top skills evaluated
                <ol class="edit-interview__overview-button__skills">
                  <hp-badge-tag
                    v-for="skill in opening.statistics.skills"
                    :quantity="skill.quantity"
                    :label="skill.value.name"
                  ></hp-badge-tag>
                </ol>
              </div>
            </div>
          </transition>
        </div>
        <hp-save-indicator :isLoading="isSaving"></hp-save-indicator>
      </teleport>
    </form>
    <div class="edit-openings__spinner" v-else>
      <hp-spinner size="24"></hp-spinner>
    </div>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import draggable from "vuedraggable";
import { useDebounceFn } from "@vueuse/core";
import { onClickOutside } from "@vueuse/core";
import * as yup from "yup";

// Views
import CandidateModal from "../openings/candidate-modal.vue";

// Components
import HpInterviewCard from "@/components/cards/hp-interview-card.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpModal from "@/components/hp-modal.vue";
import HpButton from "@/components/hp-button.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpSaveIndicator from "@/components/hp-save-indicator.vue";
import HpImageSelector from "@/components/form/hp-image-selector.vue";
import MicCheck from "@/assets/abstracts/mic-check.svg";
import HpBadgeTag from "@/components/hp-badge-tag.vue";

// Composables
import useToast from "@/composables/useToast";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import useContextSave from "@/composables/useContextSave";
import { useGet, usePut } from "@/composables/useHttp";
import useOpenings from "@/composables/useOpenings";
import useCandidates from "@/composables/useCandidates";

const route = useRoute();
const router = useRouter();
const templates = ref([]);
const opening = ref({});
const isOverviewFlyoutOpen = ref(false);
const isLoading = ref(true);
const isSaving = ref(false);
const isAddCandidateModalOpen = ref(false);

const { fetchOpenings } = useOpenings();
const { fetchCandidates } = useCandidates();

const { setBreadcrumbs } = useBreadcrumbs();

const schema = yup.object({
  name: yup
    .string()
    .required("Opening name is required")
    .label("Opening name")
    .max(240),
  description: yup.string().label("Description").max(240),
  artwork: yup.number(),
  templates: yup.array(),
});

const { handleSubmit, resetForm, meta, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    description: "",
    artwork: 0,
    templates: [],
  },
});

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});

const overviewArea = ref(null);

onClickOutside(overviewArea, (event) => {
  if (!isOverviewFlyoutOpen.value) {
    return;
  }
  isOverviewFlyoutOpen.value = false;
});

const handleDragChange = () => {
  setFieldValue("templates", templates.value);
  onSubmit();
};

const handleRemoveInterview = (templateReference) => {
  const newTemplate = templates.value.filter(
    (t) => t.reference !== templateReference
  );
  templates.value = newTemplate;
  setFieldValue("templates", newTemplate);
};

const onSubmit = handleSubmit(async (values) => {
  isSaving.value = true;
  const putOpening = usePut(`openings/${route.params.openingRef}`);
  await putOpening.put({
    opening: {
      ...values,
      templates: values.templates.map((t) => t.reference),
    },
  });
  isSaving.value = false;
  opening.value = putOpening.data.value.opening;
  resetForm({ touched: false, values: opening.value });
  fetchOpenings();
  fetchCandidates(putOpening.data.value.opening.reference, true);
  setBreadcrumbs(
    [
      {
        label: "Openings",
        to: "/openings",
      },
      {
        label: opening.value.name,
        to: `/openings/${opening.value.reference}`,
      },
    ],
    true
  );
});

const debouncedSubmit = useDebounceFn(() => {
  onSubmit();
}, 500);

onMounted(async () => {
  if (route.params.openingRef) {
    const getOpening = useGet(`openings/${route.params.openingRef}`);
    await getOpening.get();
    opening.value = getOpening.data.value.opening;
    templates.value = getOpening.data.value.opening.templates;
    resetForm({ touched: false, values: opening.value });
    isLoading.value = false;
    setBreadcrumbs(
      [
        {
          label: "Openings",
          to: "/openings",
        },
        {
          label: opening.value.name,
          to: `/openings/${opening.value.reference}`,
        },
      ],
      true
    );
  }
});

useContextSave(meta);

const archiveOpening = async () => {
  const putOpening = usePut(`openings/${route.params.openingRef}/state`);
  await putOpening.put({
    state: "archived",
  });
  fetchOpenings();
  router.push("/openings");
};
</script>

<style lang="scss" scoped>
.edit-openings {
  display: flex;
  flex-direction: column;
  &__teleport-button {
    margin-right: 6px;
    &--overview {
      position: relative;
      display: none;
    }
  }
  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }
  &__edit-container {
    background-color: var(--color-panel);
    padding: 24px;
    border-radius: $border-radius-lg;
    display: flex;
    flex-direction: column;
    &__title {
      @include text-h4;
      font-weight: 500;
    }
    &__subtitle {
      @include text-h5;
      margin: 0;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }
    &__cover-selector {
      display: none;
      flex-grow: 1;
    }
    &__archive {
      display: flex;
    }
  }
  &__empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 400px;
    &__title {
      margin-top: 24px;
      @include text-h4;
    }
    &__subtitle {
      @include text-h5;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }
  }
  &__interview-container {
    padding: 26px;
    &__grid {
      display: grid;
      grid-gap: 26px;
      grid-template-columns: repeat(auto-fill, 264px);
      align-content: baseline;
    }
    &__title {
      @include text-h2;
      font-weight: 500;
    }
    &__subtitle {
      @include text-h5;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .edit-openings {
    display: grid;
    grid-template-columns: 30% auto;
    &__edit-container {
      height: 80vh;
    }
    &__interview-container {
      padding: 0px;
      padding-left: 96px;
    }
    &__teleport-button {
      &--overview {
        display: block;
      }
    }
  }
  .edit-openings__edit-container__cover-selector {
    display: block;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
