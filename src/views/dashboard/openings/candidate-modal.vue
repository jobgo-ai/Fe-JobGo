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
          :isDisabled="isArchivingCandidate || isUpdatingCandidate"
          name="name"
        ></hp-input>
        <hp-input
          placeholder="Enter candidate email..."
          label="Email"
          :isDisabled="isArchivingCandidate || isUpdatingCandidate"
          name="email"
        ></hp-input>
      </div>
      <div
        :class="`candidate-modal__actions ${
          !isAddNew ? 'candidate-modal__actions--two-button' : ''
        }`"
      >
        <hp-tooltip>
          <hp-button
            @handleClick="archiveCandidate(candidate)"
            v-if="!isAddNew"
            :isLoading="isArchivingCandidate"
            icon="archive"
          ></hp-button>
          <template #content> Archive candidate </template>
        </hp-tooltip>
        <hp-button
          primary
          type="submit"
          :isLoading="isUpdatingCandidate"
          :isDisabled="isArchivingCandidate"
          :label="content.buttonLabel"
        ></hp-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpTooltip from "@/components/hp-tooltip.vue";

// Hooks
import { usePost, usePut } from "@/hooks/useHttp";
import useCandidates from "@/hooks/useCandidates.js";

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

const emits = defineEmits(["close"]);

const isUpdatingCandidate = ref(false);
const isArchivingCandidate = ref(false);
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
const router = useRouter();

const schema = yup.object({
  name: yup.string().required("First name is required"),
  email: yup.string().email("Email must be valid"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { ...props.candidate },
});

const { fetchCandidates, candidates, fetchCandidate } = useCandidates();

const onSubmit = handleSubmit(async (values) => {
  isUpdatingCandidate.value = true;
  if (isAddNew) {
    const postCandidate = usePost("candidates");
    const payload = {
      candidate: {
        ...values,
        opening: route.params.openingRef,
      },
    };
    await postCandidate.post(payload);
    fetchCandidates(route.params.openingRef);
    router.push(
      `/openings/${route.params.openingRef}?candidate=${postCandidate.data.value.candidate.reference}`
    );
  } else {
    const putCandidate = usePut(`candidates/${props.candidate.reference}`);
    const payload = {
      candidate: {
        ...values,
        opening: route.params.openingRef,
      },
    };
    await putCandidate.put(payload);
    fetchCandidate(props.candidate.reference);
    fetchCandidates(route.params.openingRef);
  }
  isUpdatingCandidate.value = false;
  emits("close");
});

const archiveCandidate = async () => {
  isArchivingCandidate.value = true;
  const archiveCandidate = usePut(
    `candidates/${props.candidate.reference}/state`
  );
  await archiveCandidate.put({
    state: "archived",
  });
  await fetchCandidates(route.params.openingRef);
  router.push(
    `/openings/${route.params.openingRef}?candidate=${candidates.value[0].reference}`
  );
  emits("close");
};
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
    padding-bottom: 0;
  }
  &__actions {
    padding: 16px 24px;
    display: flex;
    justify-content: flex-end;
    &--two-button {
      justify-content: space-between;
    }
  }
}
</style>