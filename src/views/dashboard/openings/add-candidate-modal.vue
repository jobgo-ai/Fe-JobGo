<template>
  <div class="add-candidate-modal">
    <div class="add-candidate-modal__header">
      <h3 class="add-candidate-modal__header__title">Add candidate</h3>
      <p class="add-candidate-modal__header__subtitle">
        New candidate for {{ opening.name }}
      </p>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="add-candidate-modal__form">
        <hp-input
          placeholder="Enter candidate's first name..."
          label="First name"
          name="firstName"
        ></hp-input>
        <hp-input
          placeholder="Enter candidate's last name..."
          label="Last name"
          name="lastName"
        ></hp-input>
        <hp-input
          placeholder="Enter candidate's email..."
          label="Email"
          name="email"
        ></hp-input>
      </div>
      <div class="add-candidate-modal__actions">
        <hp-button primary type="submit" label="Create candidate"></hp-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

// Hooks
import { usePost } from "@/hooks/useHttp";

const props = defineProps({
  opening: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["afterCandidateAdd"]);

const route = useRoute();

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { firstName: "", lastName: "", email: "" },
});

const postCandidate = usePost("candidates");
const onSubmit = handleSubmit(async (values) => {
  console.log(route);
  const payload = {
    candidate: {
      ...values,
      opening: route.params.openingRef,
    },
  };
  await postCandidate.post(payload);
  emits("afterCandidateAdd");
});
</script>

<style lang="scss">
.add-candidate-modal {
  &__header {
    padding: 24px 16px;
    border-bottom: 1px dashed var(--color-border);
    &__title {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.015em;
    }
    &__subtitle {
      color: var(--color-text-secondary);
    }
  }
  &__form {
    padding: 24px;
    border-bottom: 1px dashed var(--color-border);
    width: 408px;
  }
  &__actions {
    padding: 24px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
