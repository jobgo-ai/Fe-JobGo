<template>
  <hp-modal
    :isOpen="isAddNewOpeningModalOpen"
    @close="isAddNewOpeningModalOpen = false"
  >
    <h3></h3>
    <form @submit.prevent="onSubmit">
      <hp-input name="name"></hp-input>
      <hp-input name="description"></hp-input>
      <hp-button type="submit" label="Save"></hp-button>
    </form>
  </hp-modal>
  <h1>Openings</h1>
  <p>Manage your active opening or create a new one.</p>
  <ol class="opening-list__grid" v-if="openings.length > 0">
    <li
      class="opening-list__grid-item"
      @click="isAddNewOpeningModalOpen = true"
    >
      New opening
    </li>
    <li
      class="opening-list__grid-item"
      @click="router.push(`/openings/${opening.reference}`)"
      :key="opening.reference"
      v-for="opening in openings"
    >
      {{ opening.name }}
    </li>
  </ol>
</template>

<script setup>
//Vendor
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

//Components
import HpModal from "@/components/hp-modal.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

//Hooks
import { usePost } from "@/hooks/useHttp";

const props = defineProps({
  openings: {
    type: Array,
    default: [],
  },
});

const schema = yup.object({
  name: yup.string().required("Job title is required"),
  description: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { title: "", description: "" },
});

const router = useRouter();
const postOpening = usePost("openings");
const onSubmit = handleSubmit(async (values) => {
  await postOpening.post({ opening: { ...values, templates: [] } });
  if (postOpening.data.value) {
    router.push(`/opening/${postOpening.data.value.opening.reference}/edit`);
  }
});

const isAddNewOpeningModalOpen = ref(false);
</script>

<style lang="scss" scoped>
.opening-list__grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 1rem;
}

.opening-list__grid-item {
  background-color: gray;
}
</style>
