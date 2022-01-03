<template>
  <div>
    <hp-breadcrumbs></hp-breadcrumbs>
    <div>Create interview</div>
    <form @submit.prevent="onSubmit">
      <hp-input label="Name" name="name"></hp-input>
      <hp-input label="Description" name="description"></hp-input>
      <hp-button type="submit" label="Create"></hp-button>
    </form>
  </div>
</template>

<script setup>
import { usePost } from "@/hooks/useHttp";
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

import { useForm } from "vee-validate";
import * as yup from "yup";

const postInterview = usePost("templates");

const schema = yup.object({
  name: yup.string().required("Interview name is required"),
  description: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { name: "", description: "" },
});

const onSubmit = handleSubmit(async (values) => {
  await postInterview.post({ template: { ...values, levels: [] } });
});
</script>
