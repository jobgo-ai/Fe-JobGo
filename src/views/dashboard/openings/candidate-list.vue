<template>
  <div>
    <hp-modal
      :isOpen="isAddCandidateModalOpen"
      @close="isAddCandidateModalOpen = false"
    >
      <h3>Add candidate</h3>
      <form @submit.prevent="onSubmit">
        <hp-input name="name"></hp-input>
        <hp-input name="email"></hp-input>
        <hp-button type="submit" label="Create candidate"></hp-button>
      </form>
    </hp-modal>
    <div
      class="candidate-list"
      :class="{ 'candidate-list--left': isCandidateDetailsOpen }"
    >
      <h2>{{ opening.name }}</h2>
      <hp-button
        @handleClick="isAddCandidateModalOpen = true"
        label="add candidate"
      ></hp-button>
      <router-link :to="`/opening/${opening.reference}/compare`"
        >Compare results</router-link
      >
      <router-link :to="`/opening/${opening.reference}/edit`">Edit</router-link>
      <ol v-if="candidates.length > 0">
        Candidate List
        <li
          @click="
            router.push(
              `/openings/${route.params.openingRef}/candidates/${candidate.reference}`
            )
          "
          :key="candidate.reference"
          v-for="candidate in candidates"
        >
          {{ candidate.name }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
//Vendor
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

//Components
import HpModal from "@/components/hp-modal.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

// Hooks
import { usePost } from "@/hooks/useHttp";

const emit = defineEmits(["updateCandidateList"]);

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

const router = useRouter();
const route = useRoute();

const isAddCandidateModalOpen = ref(false);

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { name: "", email: "" },
});

// CREATE candidate
const postCandidate = usePost("candidates");
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    candidate: {
      ...values,
      openings: [props.opening.reference],
    },
  };
  await postCandidate.post(payload);

  emit("updateCandidateList");
});
</script>

<style lang="scss" scoped>
.candidate-list {
  padding: 10px;
  background-color: var(--color-primary);
  position: absolute;
  transition: all 0.15s ease-in-out;
  transform: translateX(0);
  right: 16px;
  width: 400px;
  &--left {
    right: calc(100% - 16px);
    transform: translateX(100%);
  }
}
</style>
