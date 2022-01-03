<template>
  <div>
    <hp-breadcrumbs></hp-breadcrumbs>
    <div>new Opening</div>
    <form @submit.prevent="onSubmit">
      <hp-input name="title"></hp-input>
      <hp-button type="submit" label="Add interview"></hp-button>
    </form>
  </div>
</template>

<script setup>
import HpInput from "@/components/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";

import { useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required().min(4),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { title: "fuck" },
});

const onSubmit = handleSubmit((values) => {
  console.log("wow");
  console.log(values);
  // await postRole.post({ role: { ...values, templates: [] } });
  // const url = `/roles/edit/${postRole.data.value.role.reference}`;
  // router.push(url);
});
</script>

<style lang="scss" scoped></style>
