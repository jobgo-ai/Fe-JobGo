<template>
  <div class="settings">
    <h2 class="settings__title">Settings</h2>
    <p class="settings__subtitle">Manage your personal account settings</p>
    <div class="settings__card">
      <h4 class="settings__card__title">Personal information</h4>
      <p class="settings__card__subtitle">
        Change your personal information and keep it updated
      </p>
      <hp-input
        class="settings__card__input"
        name="name"
        label="Name"
      ></hp-input>
      <hp-button
        :onClick="handleNameChange"
        label="Save changes"
        primary
        :isDisabled="!isNameDirty"
      ></hp-button>
    </div>
    <div class="settings__card settings__card--flex">
      <div>
        <h4 class="settings__card__title">Dark theme</h4>
        <p class="settings__card__subtitle">
          Reduce glare and give your eyes a break
        </p>
      </div>
      <hp-switch
        @click.prevent="handleDarkModeToggle"
        v-model:checked="darkmode"
      />
    </div>
    <div class="settings__card">
      <form @submit.pervent="onSubmit" autocomplete="off">
        <div class="settings__card__field-grid">
          <hp-input
            class="settings__card__input settings__card__input--full"
            type="password"
            name="currentPassword"
            label="Current password"
            autocomplete="new-password"
          ></hp-input>
          <hp-input
            type="password"
            name="passwordConfirmation"
            label="New password"
          ></hp-input>
          <hp-input
            type="password"
            name="password"
            label="Repeat password"
          ></hp-input>
        </div>
        <hp-button
          :onClick="onSubmit"
          label="Save changes"
          primary
          :isLoading="putUser.loading.value"
          :isDisabled="!meta.valid || putUser.loading.value"
        ></hp-button>
      </form>
    </div>
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";

// Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpSwitch from "@/components/hp-switch.vue";

// Hooks
import { usePut } from "@/hooks/useHttp";
import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";

const { user } = useAuth();

const { setToast } = useToast();
const darkmode = ref(false);
const isNameDirty = ref(false);

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

const handleNameChange = () => {
  console.log("name change");
};

const { handleSubmit, meta, resetForm, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: {
    name: user.value.firstName + " " + user.value.lastName,
  },
});

const putUser = usePut("self/password");

const onSubmit = handleSubmit(async (values) => {
  await putUser.put({
    password: {
      current: values.currentPassword,
      new: values.password,
    },
  });

  if (putUser.error.value) {
    setFieldError("currentPassword", "Current password is incorrect");
  } else {
    setToast({
      type: "positive",
      title: "New password, new you!",
      message: "Your password has been changed successfully",
    });
    resetForm();
  }
});

const handleDarkModeToggle = () => {
  darkmode.value = !darkmode.value;
  if (darkmode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};
</script>

<styles lang="scss">
.settings {
  @include pageContainer;
  &__title {
    @include text-h2;
    font-weight: 600;
  }
  &__subtitle {
    color: var(--color-text-secondary);
    @include text-h5;
    padding-bottom: 32px;
  }
  &__card {
    border: $border;
    border-radius: $border-radius-md;
    padding: 24px;
    margin-bottom: 16px;
    &--flex {
      display: flex;
      justify-content: space-between;
    }
    &__input {
      max-width: 332px;
      &--full {
        grid-column: 1 / 3;
      }
    }
    &__title {
      font-weight: 500;
      @include text-h5;
    }
    &__subtitle {
      color: var(--color-text-secondary);
      margin-bottom: 16px;
    }
    &__field-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
    }
  }
}
</styles>
