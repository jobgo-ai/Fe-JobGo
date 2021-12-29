<template>
  <div>
    <hp-modal
      :isOpen="isAddCandidateModalOpen"
      @close="isAddCandidateModalOpen = false"
      >Im a modal</hp-modal
    >
    <div
      class="candidate-list"
      :class="{ 'candidate-list--left': isCandidateDetailsOpen }"
    >
      <hp-button
        @handleClick="isAddCandidateModalOpen = true"
        label="add candidate"
      ></hp-button>
      <router-link :to="`/openings/${opening.reference}/compare`"
        >Compare results</router-link
      >
      <router-link :to="`/openings/${opening.reference}/edit`"
        >Edit</router-link
      >
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
import HpModal from "@/components/hp-modal.vue";
import HpButton from "@/components/hp-button.vue";
import { usePost } from "@/hooks/useHttp";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

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

const isAddCandidateModalOpen = ref(false);

// Create candidate
const postCandidate = usePost("candidates");
const onSubmit = async (values) => {
  const payload = {
    candidate: {
      ...values,
      roles: values.roles ? [values.roles] : [],
    },
  };
  await postCandidate.post(payload);
  router.push(`/candidates/${postCandidate.data.value.candidate.reference}`);
};
</script>

<style lang="scss" scoped>
.candidate-list {
  padding: 10px;
  background-color: green;
  position: absolute;
  height: 100%;
  transition: all 0.15s ease-in-out;
  transform: translateX(0);
  right: 0;
  width: 194px;
  &--left {
    right: 100%;
    transform: translateX(100%);
  }
}
</style>
