<template>
  <div class="candidate-modal">
    <div class="candidate-modal__header">
      <h3 class="candidate-modal__header__title">{{ content.title }}</h3>
      <p class="candidate-modal__header__subtitle">
        {{ content.subtitle }}
      </p>
    </div>
    <form @submit="onSubmit">
      <div class="candidate-modal__form">
        <hp-input
          placeholder="Enter candidate name"
          label="Name"
          name="name"
        ></hp-input>
        <hp-input
          placeholder="Enter candidate email..."
          label="Email"
          name="email"
        ></hp-input>
      </div>
      <div class="candidate-modal__actions">
        <hp-button v-if="!isAddNew" icon="archive"></hp-button>
        <hp-button
          primary
          type="submit"
          :label="content.buttonLabel"
        ></hp-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

// Hooks
import { usePost, usePut } from "@/hooks/useHttp";
import useFetchCandidates from "@/hooks/useFetchCandidates.js";

const props = defineProps({
  opening: {
    type: Object,
    required: true,
  },
  candidate: {
    type: Object,
    default: { name: "", email: "" },
  },
});

const emits = defineEmits(["afterCandidateAdd"]);

const isAddNew = props.candidate.name === "";

const content = computed(() => {
  return isAddNew
    ? {
        title: "Add candidate",
        subtitle: `New candidate for ${props.opening.name}`,
        buttonLabel: "Create candidate",
      }
    : {
        title: "Edit candidate",
        subtitle: `Edit candidate for ${props.opening.name}`,
        buttonLabel: "Update candidate",
      };
});

const route = useRoute();

const schema = yup.object({
  name: yup.string().required("First name is required"),
  email: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { ...props.candidate },
});

const { fetchCandidates } = useFetchCandidates();

const onSubmit = handleSubmit(async (values) => {
  if (isAddNew) {
    const postCandidate = usePost("candidates");
    const payload = {
      candidate: {
        ...values,
        opening: route.params.openingRef,
      },
    };
    await postCandidate.post(payload);
    emits("afterCandidateAdd", postCandidate.data.value.candidate.reference);
  } else {
    const putCandidate = usePut(`candidates/${props.candidate.reference}`);
    const payload = {
      candidate: {
        ...values,
        opening: route.params.openingRef,
      },
    };
    await putCandidate.put(payload);
    emits("afterCandidateAdd");
  }
  fetchCandidates(route.params.openingRef);
});
</script>

<style lang="scss">
.candidate-modal {
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
