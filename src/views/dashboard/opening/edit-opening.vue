<template>
  <div class="edit-openings">
    <div class="edit-openings__edit-container">
      <h3 class="edit-openings__edit-container__title">Edit opening</h3>
      <p class="edit-openings__edit-container__subtitle">
        Main information for your openings
      </p>
      <form v-if="!isLoading" @submit.prevent="handleContextFormSave">
        <hp-input label="Name" name="name"></hp-input>
        <hp-textarea label="Description" name="description"></hp-textarea>
        <hp-image-selector label="Cover" name="artwork"></hp-image-selector>
      </form>
    </div>
    <div>
      <div class="edit-openings__empty-state" v-if="templates.length === 0">
        <mic-check />
        <p class="edit-openings__empty-state__title">Mic check! One, two...</p>
        <p class="edit-openings__empty-state__subtitle">
          Looking a bit empty here, please add an interview
        </p>
        <hp-button label="Add template"></hp-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// vendor
import { onMounted, ref, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
//components
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

const { setBreadcrumbs } = useBreadcrumbs();
const { setToast } = useToast();

const schema = yup.object({
  name: yup.string().required("Opening name is required"),
  description: yup.string(),
  artwork: yup.number(),
});

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    description: "",
    artwork: 0,
  },
});

const onSubmit = handleSubmit(async (values) => {
  const putOpening = usePut(`openings/${route.params.openingRef}`);
  await putOpening.put({
    opening: {
      ...values,
      templates: opening.value.templates.map((t) => t.reference),
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
      font-weight: 500;
    }
    &__subtitle {
      @include text-h5;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }
  }
}
</style>
