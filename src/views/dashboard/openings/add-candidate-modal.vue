<template>
  <h3>Add candidate</h3>
  <form @submit.prevent="onSubmit">
    <hp-input name="name"></hp-input>
    <hp-input name="email"></hp-input>
    <hp-button type="submit" label="Create candidate"></hp-button>
  </form>
</template>

<script setup>
import * as yup from "yup";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

// Hooks
import { usePost } from "@/hooks/useHttp";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { name: "", email: "" },
});
const postCandidate = usePost("candidates");
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    candidate: {
      ...values,
      opening: props.opening.reference,
    },
  };
  await postCandidate.post(payload);
  await fetchCandidates();
  isAddCandidateModalOpen.value = false;
});
</script>
