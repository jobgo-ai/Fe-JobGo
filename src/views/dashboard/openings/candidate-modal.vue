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
          ref="nameInput"
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
            danger
          ></hp-button>
          <template #content> Archive candidate </template>
        </hp-tooltip>
        <hp-button
          primary
          type="submit"
          :isLoading="isUpdatingCandidate"
          :isDisabled="!meta.valid"
          :label="content.buttonLabel"
        ></hp-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpTooltip from "@/components/hp-tooltip.vue";

// Composables
import { usePost, usePut } from "@/composables/useHttp";
import useOpenings from "@/composables/useOpenings";
import useCandidates from "@/composables/useCandidates";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import useToast from "@/composables/useToast";

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

const nameInput = ref(null);

watchEffect(() => {
  if (nameInput.value) {
    nameInput.value.inputRef.focus();
  }
});

const { setToast } = useToast();

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

const { setBreadcrumbs } = useBreadcrumbs();

const schema = yup.object({
  name: yup.string().max(50).required("First name is required"),
  email: yup
    .string()
    .max(100)
    .required("Email is required")
    .email("Email must be valid"),
});

const { handleSubmit, meta } = useForm({
  validationSchema: schema,
  initialValues: { ...props.candidate },
});

const { fetchOpening } = useOpenings();

const { fetchCandidates, candidates, fetchCandidate, candidate } =
  useCandidates();

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
    setToast({
      type: "positive",
      title: "Well done!",
      message: "Candidate created successfully",
    });
    fetchCandidates(route.params.openingRef, true);
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
    setToast({
      type: "positive",
      title: "What a change!",
      message: "Candidate updated successfully",
    });
    await fetchCandidate(props.candidate.reference);
    setBreadcrumbs([
      {
        label: "Openings",
        to: "/openings",
      },
      {
        label: props.opening.name,
        to: `/openings/${route.params.openingRef}`,
      },
      {
        label: candidate.value.name,
        to: `/opening/${route.params.openingRef}?candidate=${candidate.value.reference}`,
      },
    ]);
    fetchCandidates(route.params.openingRef, true);
  }
  fetchOpening(route.params.openingRef);
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
  await fetchCandidates(route.params.openingRef, true);
  setToast({
    type: "success",
    title: "What a change!",
    message: "Candidate updated successfully",
  });
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
    width: 100%;
    max-width: 408px;
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
