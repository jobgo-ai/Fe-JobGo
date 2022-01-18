<template>
  <div class="candidate-details">
    <div>Details</div>
    <div v-if="candidate.name">{{ candidate.name }}</div>
    <div>
      {{ candidate }}
    </div>
    <ul class="candidate-details__interview-grid">
      <li
        class="candidate-details__interview-grid__item"
        v-for="interview in opening.templates"
      >
        <div v-if="interview.interview.terminated">
          Terminated
          <router-link
            :to="`/opening/${route.params.openingRef}/results/${interview.interview.token}`"
            >View results</router-link
          >
        </div>
        <div
          v-else-if="
            interview.interview.started && !interview.interview.terminated
          "
        >
          Started but not done
        </div>
        <div v-else>
          <div v-if="nextAction === interview.interview.token">
            This is the action to take
          </div>
          <a target="_blank" :href="`${URL}/token/${interview.interview.token}`"
            >Go to interview</a
          >
        </div>
      </li>
    </ul>
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
const nextAction = ref(null);
const URL = import.meta.env.VITE_INTERVIEW_URL;

const fetchCandidate = async () => {
  const getCandidate = useGet(`candidates/${route.query.candidate}`);
  await getCandidate.get();
  candidate.value = getCandidate.data.value.candidate;
  opening.value = getCandidate.data.value.candidate.opening;
  // nextAction.value = getCandidate.data.value.candidate.opening.templates.find(
  //   (t) => {
  //     return !t.interview?.started;
  //   }
  // ).interview?.token;
};

onMounted(async () => {
  await fetchCandidate();
});

watch(
  () => route.query.candidate,
  async () => {
    if (route.query.candidate) {
      await fetchCandidate();
    }
  }
);
</script>

<style scoped lang="scss">
.candidate-details {
  &__interview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
  }
  &__interview-grid__item {
    padding: 20px;
    background: cornsilk;
  }
}
</style>
