<template>
  <div class="edit-openings">
    <div class="edit-openings__edit-container">
      <h3 class="edit-openings__edit-container__title">Edit opening</h3>
      <p class="edit-openings__edit-container__subtitle">
        Main information for your openings
      </p>
      <form @submit.prevent="onSubmit">
        <hp-input label="Title" name="name"></hp-input>
        <hp-textarea label="Description" name="description"></hp-textarea>
        <hp-image-selector
          label="Cover"
          name="artwork"
          v-model="artwork"
        ></hp-image-selector>
      </form>
    </div>
  </div>
</template>

<script setup>
import HpInput from "@/components/form/hp-input.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpImageSelector from "@/components/form/hp-image-selector.vue";
import { useGet, usePut } from "@/hooks/useHttp";

import { onMounted, ref, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

const route = useRoute();
const router = useRouter();
const templates = ref([]);
const opening = ref({});

const artwork = ref(0);

const schema = yup.object({
  name: yup.string().required("Job title is required"),
  description: yup.string(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
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
});

onMounted(async () => {
  if (route.params.openingRef) {
    const getOpening = useGet(`openings/${route.params.openingRef}`);
    await getOpening.get();
    opening.value = getOpening.data.value.opening;
    templates.value = getOpening.data.value.opening.templates;
    setValues(opening.value);
  }
});

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
