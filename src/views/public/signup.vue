<template>
  <div class="signup">
    <div class="signup__logo"><Logo /></div>
    <div class="signup__container">
      <div class="signup__image-container"></div>
      <p class="signup__subtitle">Welcome back!</p>
      <h2 class="signup__title">Log into Hireproof</h2>
      <form @submit="onSubmit">
        <hp-input name="name" placeholder="Type your name" label="Name" />
        <hp-input name="email" placeholder="Type your email" label="Email" />
        <div class="signup__password-container">
          <hp-input
            name="password"
            placeholder="Enter your password"
            label="Password"
            type="password"
          />
        </div>
        <div class="signup__checkbox-container">
          <hp-checkbox
            :isLoading="postLogin.loading.value"
            name="terms"
          ></hp-checkbox>
          <div class="signup__checkbox-container__text">
            Agree to the
            <a
              class="signup__checkbox-container__link"
              href="https://www.hireproof.io/terms-of-service"
              >Terms of Service</a
            >
            and
            <a
              class="signup__checkbox-container__link"
              href="https://www.hireproof.io/terms-of-service"
              >Privacy Policy</a
            >
          </div>
        </div>
        <hp-button
          :isLoading="postLogin.loading.value"
          primary
          type="submit"
          label="Continue"
        ></hp-button>
      </form>
    </div>
    <router-link
      class="signup__signin signup__checkbox-container__text"
      to="/signin"
      >Already have an account?
      <span class="signup__checkbox-container__link">Sign In</span></router-link
    >
  </div>
</template>

<script setup>
// Vendor
import { useRouter } from "vue-router";
import * as yup from "yup";
import { useForm } from "vee-validate";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpCheckbox from "@/components/hp-checkbox.vue";
import HpButton from "@/components/hp-button.vue";
import useAuth from "@/composables/useAuth";
import Logo from "@/assets/logo.svg";

//Hooks
import { usePost } from "@/composables/useHttp";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required()
    .label("Email"),
  password: yup.string().min(6).required().label("Password"),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms of service")
    .label("Terms of Service"),
});

const { handleSubmit, isSubmitting, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: { name: "", email: "", password: "", terms: false },
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
  } else {
    setFieldError("password", "Invalid email or password");
  }
});
</script>

<style lang="scss">
.signup {
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
    box-shadow: $box-shadow;
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
  &__error {
    color: var(--color-error);
    margin-bottom: 16px;
  }

  &__checkbox-container {
    display: flex;
    align-items: center;
    @include text-h5;
    margin-bottom: 24px;
    &__text {
      color: var(--color-text-secondary);
      font-weight: 400;
      margin-left: 6px;
    }
    &__link {
      font-weight: 500;
      color: var(--color-text-primary);
    }
  }
  &__signin {
    margin: auto;
    margin-top: 32px;
  }
}
</style>
