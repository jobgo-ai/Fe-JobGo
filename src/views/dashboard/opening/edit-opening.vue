<template>
  <div>
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
          <hp-input label="Name" name="name"></hp-input>
          <hp-textarea label="Description" name="description"></hp-textarea>
          <hp-image-selector
            class="edit-openings__edit-container__cover-selector"
            label="Cover"
            name="artwork"
          ></hp-image-selector>
          <div class="edit-openings__edit-container__archive">
            <hp-button
              icon="trash"
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
        <div
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
                  <li
                    class="edit-interview__overview-button__skills__skill"
                    v-for="level in opening.statistics.jobLevels"
                  >
                    {{ level.value.name }}
                    <hp-badge
                      class="
                        edit-interview__overview-button__skills__skill__badge
                      "
                      :content="level.quantity"
                    ></hp-badge>
                  </li>
                </ol>
              </div>
              <div class="edit-interview__overview-button__flyout__header">
                Top skills evaluated
                <ol class="edit-interview__overview-button__skills">
                  <li
                    class="edit-interview__overview-button__skills__skill"
                    v-for="skill in opening.statistics.skills"
                  >
                    {{ skill.value.name }}
                    <hp-badge
                      class="
                        edit-interview__overview-button__skills__skill__badge
                      "
                      :content="skill.quantity"
                    ></hp-badge>
                  </li>
                </ol>
              </div>
            </div>
          </transition>
        </div>
        <hp-button
          label="Save"
          type="submit"
          primary
          :isLoading="isSaving"
          @handleClick="onSubmit"
          :isDisabled="!meta.dirty || !meta.valid"
        ></hp-button>
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
import * as yup from "yup";

// Components
import HpInterviewCard from "@/components/cards/hp-interview-card.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpImageSelector from "@/components/form/hp-image-selector.vue";
import MicCheck from "@/assets/abstracts/mic-check.svg";
import HpBadge from "@/components/hp-badge.vue";

// Composables
import useToast from "@/composables/useToast";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import useContextSave from "@/composables/useContextSave";
import { useGet, usePut } from "@/composables/useHttp";

const route = useRoute();
const router = useRouter();
const templates = ref([]);
const opening = ref({});
const isOverviewFlyoutOpen = ref(false);
const isLoading = ref(true);
const isSaving = ref(false);

const { setBreadcrumbs } = useBreadcrumbs();
const { setToast } = useToast();

const schema = yup.object({
  name: yup.string().required("Opening name is required"),
  description: yup.string(),
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

const handleDragChange = () => {
  setFieldValue("templates", templates.value);
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
  setToast({
    type: "positive",
    title: "Well done!",
    message: `${putOpening.data.value.opening.name} updated`,
  });
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
  router.push("/openings");
};
</script>

<style lang="scss" scoped>
.edit-openings {
  display: grid;
  grid-template-columns: 30% auto;
  &__teleport-button {
    margin-right: 6px;
    &--overview {
      position: relative;
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
    height: 80vh;
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
    padding-left: 96px;
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
