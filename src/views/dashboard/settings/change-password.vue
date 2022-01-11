<template>
  <div>
    <h3>Change password</h3>
    <form @submit.prevent="onSubmit">
      <hp-input type="password" name="currentPassword"></hp-input>
      <hp-input type="password" name="password"></hp-input>
      <hp-input type="password" name="passwordConfirmation"></hp-input>
      <hp-button type="submit" label="Create candidate"></hp-button>
    </form>
  </div>
</template>

<script setup>
//Vendor
import { useForm } from "vee-validate";
import * as yup from "yup";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

// Hooks
import { usePatch } from "@/hooks/useHttp";

const props = defineProps({
  candidates: {
    type: Array,
    default: [],
  },
  isCandidateDetailsOpen: {
    type: Boolean,
    default: false,
  },
  opening: {
    type: Object,
    default: [],
  },
});

const patchUser = usePatch("self");
const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .label("Current password")
    .min(8)
    .max(70)
    .matches(/^[\S]+$/, "Password may not include white space")
    .required(),
  password: yup
    .string()
    .label("Password")
    .min(8)
    .max(70)
    .matches(/^[\S]+$/, "Password may not include white space")
    .required(),
  passwordConfirmation: yup
    .string()
    .label("Confirm password")
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const { handleSubmit, resetForm, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: { name: "", description: "" },
});

const onSubmit = handleSubmit(async (values) => {
  await patchUser.patch({
    self: {
      password: {
        current: values.currentPassword,
        new: values.password,
      },
    },
  });

  if (patchUser.error.value) {
    setFieldError("currentPassword", "Current password is incorrect");
  } else {
    resetForm();
  }
});
</script>

<style lang="scss" scoped>
.candidate-list {
  padding: 10px;
  background-color: var(--color-primary);
  position: absolute;
  transition: all 0.15s ease-in-out;
  transform: translateX(0);
  right: 0;
  width: 400px;
  &--left {
    right: 100%;
    transform: translateX(100%);
  }
}
</style>
