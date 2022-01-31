<template>
  <form
    class="edit-openings"
    v-if="!isLoading"
    @submit.prevent="handleContextFormSave"
  >
    <div class="edit-openings__edit-container">
      <h3 class="edit-openings__edit-container__title">Edit opening</h3>
      <p class="edit-openings__edit-container__subtitle">
        Main information for your openings
      </p>
      <hp-input label="Name" name="name"></hp-input>
      <hp-textarea label="Description" name="description"></hp-textarea>
      <hp-image-selector label="Cover" name="artwork"></hp-image-selector>
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
          handle=".hp-opening-card__badge-container__handle"
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
            ></hp-interview-card>
          </template>
        </draggable>
      </div>
    </div>
  </form>
</template>

<script setup>
// vendor
import { onMounted, ref, defineAsyncComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import draggable from "vuedraggable";
import * as yup from "yup";
//components
import HpInterviewCard from "@/components/hp-interview-card.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpImageSelector from "@/components/form/hp-image-selector.vue";
import MicCheck from "@/assets/abstracts/mic-check.svg";
// hooks
import useToast from "@/hooks/useToast";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import useContextSave from "@/hooks/useContextSave";
import { useGet, usePut } from "@/hooks/useHttp";

const route = useRoute();
const router = useRouter();
const templates = ref([]);
const opening = ref({});
const isLoading = ref(true);
const drag = ref(false);

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

const onSubmit = handleSubmit(async (values) => {
  const putOpening = usePut(`openings/${route.params.openingRef}`);
  await putOpening.put({
    opening: {
      ...values,
      templates: values.templates.map((t) => t.reference),
    },
  });
  opening.value = putOpening.data.value.opening;
  resetForm({ touched: false, values: opening.value });
  setToast({
    type: "positive",
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

const { handleContextFormSave } = useContextSave(meta, onSubmit);

const archiveOpening = async () => {
  const putOpening = usePut(`openings/${route.params.openingRef}/state`);
  await putOpening.put({
    state: "archived",
  });
  router.push("/openings");
  // const deleteOpening = useDelete(`openings/${route.params.openingRef}`);
  // await deleteOpening.remove();
  // router.push("/openings");
};

const currentSplash = defineAsyncComponent(() =>
  import(
    /* @vite-ignore */ `../assets/abstracts/covers/cover_${props.opening.artwork}.svg`
  )
);
</script>

<style lang="scss" scoped>
.edit-openings {
  display: grid;
  grid-template-columns: 30% auto;
  &__edit-container {
    background-color: var(--color-panel);
    padding: 24px;
    border-radius: $border-radius-lg;
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
  }
  &__empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
