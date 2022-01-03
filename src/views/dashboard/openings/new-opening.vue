<template>
  <div>
    <hp-breadcrumbs></hp-breadcrumbs>
    <div>new Opening</div>
    <form @submit.prevent="onSubmit">
      <hp-input name="name"></hp-input>
      <hp-input name="description"></hp-input>
      <hp-button type="submit" label="Add interview"></hp-button>
    </form>
  </div>
</template>

<script setup>
import { usePost } from "@/hooks/useHttp";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";

import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Job title is required"),
  description: yup.string(),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { title: "", description: "" },
});

const router = useRouter();
const postRole = usePost("roles");
const onSubmit = handleSubmit(async (values) => {
  await postRole.post({ role: { ...values, templates: [] } });
  if (postRole.data.value) {
    router.push(`/openings/${postRole.data.value.role.reference}/edit`);
  }
});
</script>

<style lang="scss" scoped></style>
