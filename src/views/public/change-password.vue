<template>
  <div class="change-password">
    <div class="change-password__logo"><Logo /></div>
    <div class="change-password__container">
      <div class="change-password__image-container"></div>
      <h2 class="change-password__title">Reset password</h2>
      <p class="change-password__text">
        Don’t worry! Just fill in your email and we’ll send you a link to reset
        your password.
      </p>
      <hp-input
        name="password"
        placeholder="Enter your new password"
        label="Password"
        type="password"
      />
      <hp-input
        name="password2"
        placeholder="Confirm your new password"
        label="Password"
        type="password"
      />
      <hp-button
        @handleClick="handlePasswordReset"
        primary
        :isDisabled="!meta.valid"
        label="Reset password"
      ></hp-button>
    </div>
    <div class="forgot-password__tos">
      <a href="www.google.com" class="forgot-password__policy">
        Terms of service
      </a>
      <a href="www.google.com" class="forgot-password__policy">
        Privacy policy
      </a>
    </div>
  </div>
</template>

<script setup>
// Vendor
import { useRouter, useRoute } from "vue-router";
import * as yup from "yup";
import { useForm } from "vee-validate";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import Logo from "@/assets/logo.svg";

//Hooks
import { usePut } from "@/composables/useHttp";

const route = useRoute();
const router = useRouter();

const token = route.query.token;

const schema = yup.object().shape({
  password: yup.string().min(6).required().label("Password"),
  password2: yup
    .string()
    .required("Must enter password twice")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const { handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: schema,
  initialValues: { password: "", password2: "" },
});

const postChangePassword = usePut("self/password");

const handlePasswordReset = handleSubmit(async (values) => {
  const payload = {
    self: {
      password: values.password,
    },
    token: token,
  };
  await postChangePassword.put(payload);
  router.push("/login");
});
</script>

<chode lang="scss">
.change-password {
  display: flex;
  flex-direction: column;
  &__subtitle {
    @include text-h3;
    font-weight: 500;
    color: var(--color-text-secondary);
  }
  &__title {
    @include text-h3;
    font-weight: 500;
    margin-bottom: 24px;
  }
  &__logo {
    margin: auto;
    margin-bottom: 48px;
    margin-top: 64px;
  }
  &__container {
    margin: auto;
    padding: 24px;
    width: 460px;
    border: $border;
    border-radius: $border-radius-md;
    background-color: var(--color-background);
    position: relative;
  }
  &__image-container {
    display: flex;
    background-image: url("../../assets/abstracts/decorations/illustration.svg");
    position: absolute;
    top: 50%;
    height: 446px;
    width: 588px;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: -1;
  }
  &__password-container {
    position: relative;
  }
  &__forgot-password {
    position: absolute;
    right: 0;
    top: 0;
    @include text-h5;
  }
  &__text {
    margin-bottom: 16px;
  }
}
</chode>
