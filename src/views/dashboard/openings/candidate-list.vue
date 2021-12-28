<template>
  <div
    class="candidate-list"
    :class="{ 'candidate-list--left': isCandidateDetailsOpen }"
  >
    <div v-if="candidates.length > 0">
      Candidate List
      <div
        @click="
          router.push(
            `/openings/${route.params.openingRef}/candidates/${candidate.reference}`
          )
        "
        :key="candidate.reference"
        v-for="candidate in candidates"
      >
        {{ candidate.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
defineProps({
  candidates: {
    type: Array,
    default: [],
  },
  isCandidateDetailsOpen: {
    type: Boolean,
    default: false,
  },
});
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
