<template>
  <div class="edit-openings">
    <div @click="handleRandomClick">wow fucking click me</div>
    <div class="edit-openings__edit-container">
      <h3 class="edit-openings__edit-container__title">Edit opening</h3>
      <p class="edit-openings__edit-container__subtitle">
        Main information for your openings
      </p>
      <form v-if="!isLoading" @submit.prevent="onSubmit">
        <hp-input label="Name" name="name"></hp-input>
        <hp-textarea label="Description" name="description"></hp-textarea>
        <hp-image-selector
          v-if="artwork"
          label="Cover"
          name="artwork"
          v-model="artwork"
        ></hp-image-selector>
      </form>
    </div>
  </div>
</template>

<script setup>
// vendor
import { onMounted, ref, defineAsyncComponent, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
//components
import HpInput from "@/components/form/hp-input.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpImageSelector from "@/components/form/hp-image-selector.vue";
// hooks
import useToast from "@/hooks/useToast";
import useContextSave from "@/hooks/useContextSave";
import { useGet, usePut } from "@/hooks/useHttp";

const route = useRoute();
const router = useRouter();
const templates = ref([]);
const opening = ref({});
const isLoading = ref(true);

const artwork = ref(null);

const { setToast } = useToast();

const schema = yup.object({
  name: yup.string().required("Opening name is required"),
  description: yup.string(),
});

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    description: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  const putOpening = usePut(`openings/${route.params.openingRef}`);
  await putOpening.put({
    opening: {
      ...values,
      artwork: artwork.value,
      templates: opening.value.templates.map((t) => t.reference),
    },
  });
  setToast({
    type: "positive",
    message: `${putOpening.data.value.opening.name} updated`,
  });
});

onMounted(async () => {
  if (route.params.openingRef) {
    const getOpening = useGet(`openings/${route.params.openingRef}`);
    await getOpening.get();
    opening.value = getOpening.data.value.opening;
    templates.value = getOpening.data.value.opening.templates;
    artwork.value = opening.value.artwork;
    resetForm({ touched: false, values: opening.value });
    isLoading.value = false;
  }
});

const isDirty = computed(() => meta.value.dirty);

useContextSave(isDirty, onSubmit);

const archiveOpening = async () => {
  const putOpening = usePut(`openings/${route.params.openingRef}/state`);
  await putOpening.put({
    state: "archived",
  });
  router.push("/openings");
  //Hard delete
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
}
</style>
