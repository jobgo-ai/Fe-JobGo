<template>
  <div class="signup">
    <div class="signup__logo"><Logo /></div>
    <div class="signup__container">
      <div class="signup__image-container"></div>
      <p class="signup__subtitle">Welcome aboard!</p>
      <h2 class="signup__title">Sign up with Hireproof</h2>
      <form @submit="onSubmit">
        <hp-input name="name" placeholder="Type your name" label="Name" />
        <hp-input
          :isDisabled="true"
          name="email"
          placeholder="Type your email"
          label="Email"
        />
        <div class="signup__password-container">
          <hp-input
            name="password"
            placeholder="Enter your password"
            label="Password"
            type="password"
          />
        </div>
        <div class="signup__password-container">
          <hp-input
            name="passwordConfirmation"
            placeholder="Repeat your password"
            label="Repeat password"
            type="password"
          />
        </div>
        <button
          class="signup__checkbox-container"
          type="button"
          @click="toggleTerms"
        >
          <hp-checkbox
            :isLoading="postLogin.loading.value"
            name="terms"
          ></hp-checkbox>
          <div class="signup__checkbox-container__text">
            Agree to the
            <a
              class="signup__checkbox-container__link"
              target="_blank"
              href="https://www.hireproof.io/terms-of-service"
              >Terms of Service</a
            >
            and
            <a
              class="signup__checkbox-container__link"
              target="_blank"
              href="https://www.hireproof.io/privacy-policy"
              >Privacy Policy</a
            >
          </div>
        </button>
        <div v-if="error" class="signup__error">{{ error }}</div>
        <hp-button
          :isLoading="isLoading"
          primary
          :isDisabled="!meta.dirty || !meta.valid"
          type="submit"
          label="Continue"
          fullWidth
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as yup from "yup";
import { useForm } from "vee-validate";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpCheckbox from "@/components/form/hp-checkbox.vue";
import HpButton from "@/components/hp-button.vue";
import useAuth from "@/composables/useAuth";
import Logo from "@/assets/logo.svg";

//Hooks
import { usePost } from "@/composables/useHttp";

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required()
    .label("Email"),
  password: yup.string().min(6).required().label("Password"),
  passwordConfirmation: yup
    .string()
    .label("Confirm password")
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
  terms: yup
    .boolean()
    .required()
    .oneOf([true], "You must agree to the terms of service")
    .label("Terms of Service"),
});

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const error = ref(null);

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
  setFieldValue,
  meta,
  values,
} = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    email: route.query.email,
    password: "",
    terms: false,
  },
});

const toggleTerms = (e) => {
  if (e.target.tagName === "LABEL") {
    e.preventDefault();
  }
  setFieldValue("terms", !values.terms);
};
const postUsers = usePost("users");
const postLogin = usePost("self/login");

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const { email, password, name } = values;
  const payload = {
    user: {
      name,
      email,
      password,
    },
    invitation: route.query.token,
  };
  await postUsers.post(payload);
  const data = {
    credentials: {
      email,
      password,
    },
  };
  await postLogin.post(data);
  if (postLogin.data.value) {
    error.value = false;
    const { setUser } = useAuth();
    setUser(postLogin.data.value, true);
    router.push("/");
  } else {
    error.value = "Something went wrong";
    isLoading.value = false;
  }
});
</script>

<style lang="scss">
.signup {
  display: flex;
  flex-direction: column;
  padding: 24px;
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
    height: 48px;
    width: 48px;
  }
  &__container {
    margin: auto;
    padding: 24px;
    width: 100%;
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
    height: 100%;
    width: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: $z-index-negative;
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
    background-color: var(--color-background);
    border: none;
    align-items: center;
    width: 100%;
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
    &:focus {
      outline: 4px solid var(--color-focus);
      border-radius: 4px;
    }
  }
  &__signin {
    margin: auto;
    margin-top: 32px;
  }
  &__error {
    color: var(--color-error);
  }
}

@media (min-width: $breakpoint-tablet) {
  .signup {
    padding: 0;
    &__container {
      width: 460px;
    }
    &__logo {
      margin-top: 64px;
    }
    &__image-container {
      display: flex;
      background-image: url("../../assets/abstracts/decorations/illustration.svg");
      position: absolute;
      top: 50%;
      height: 446px;
      width: 588px;
    }
  }
}
</style>
