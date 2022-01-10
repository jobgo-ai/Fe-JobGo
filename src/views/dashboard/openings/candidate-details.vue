<template>
  <div class="candidate-details">
    <div>Details</div>
    <div v-if="candidate.name">{{ candidate.name }}</div>
    <div class="candidate-details__interview-grid">
      <ul class="">
        <li v-for="interview in opening.templates">
          {{ interview.interview.token }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  openings: {
    type: Array,
    default: [],
  },
});

import { useGet } from "@/hooks/useHttp";
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const candidate = ref({});
const opening = ref({});

const fetchCandidate = async () => {
  const getCandidate = useGet(`candidates/${route.params.candidateRef}`);
  await getCandidate.get();
  candidate.value = getCandidate.data.value.candidate;
  opening.value = getCandidate.data.value.candidate.openings[0];
  console.log(getCandidate.data.value.candidate.openings[0]);
};

onMounted(async () => {
  await fetchCandidate();
});

watch(
  () => route.params.candidateRef,
  async () => {
    if (route.params.candidateRef) {
      await fetchCandidate();
    }
  }
);
</script>
