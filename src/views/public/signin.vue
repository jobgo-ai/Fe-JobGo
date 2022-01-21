<template>
  <div>
    signin
    <hp-input name="email" label="username" />
    <hp-input name="password" label="password" type="password" />
    <hp-button
      icon="diamond"
      @handleClick="onSubmit"
      label="Signin"
    ></hp-button>
  </div>
</template>

<script setup>
// Vendor
import { useRouter } from "vue-router";
import * as yup from "yup";
import { useForm } from "vee-validate";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import useAuth from "@/hooks/useAuth";

//Hooks
import { usePost } from "@/hooks/useHttp";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email address")
    .required()
    .label("Email"),
  password: yup.string().min(6).required().label("Password"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { title: "", description: "" },
});

const router = useRouter();
const postLogin = usePost("self/login");

const onSubmit = handleSubmit(async (values) => {
  const data = {
    credentials: { ...values },
  };
  await postLogin.post(data);
  if (postLogin.data.value) {
    const { setUser } = useAuth();
    setUser(postLogin.data.value, true);
    router.push("/openings");
  }
});
</script>
