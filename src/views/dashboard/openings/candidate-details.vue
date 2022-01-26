<template>
  <div class="candidate-details">
    <div v-if="candidate.reference">
      <div class="candidate-details__info">
        <div class="candidate-details__info__name">{{ candidate.name }}</div>
        <div class="candidate-details__info__email">{{ candidate.email }}</div>
      </div>
      <div class="candidate-details__overview">
        <div class="candidate-details__overview__score">
          {{ candidate.opening.statistics.averageScore }}
        </div>
        <div class="candidate-details__overview__skills">
          <ol
            class="candidate-details__overview__skills__skill"
            v-for="skill in skillList"
          >
            {{
              skill.label
            }}
            {{
              skill.value
            }}
          </ol>
        </div>
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
            <a
              target="_blank"
              :href="`${URL}/token/${interview.interview.token}`"
              >Go to interview</a
            >
          </div>
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

import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useGet } from "@/hooks/useHttp";
import { onMounted, watch, ref, computed } from "vue";
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
  const { setBreadcrumbs } = useBreadcrumbs();
  setBreadcrumbs([
    {
      label: "Openings",
      to: "/openings",
    },
    {
      label: getCandidate.data.value.candidate.name,
      to: `/opening/${opening.value.reference}?candidate=${candidate.value.reference}`,
    },
  ]);
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

const skillList = computed(() => {
  if (candidate.value.statistics) {
    return [];
  }
  return candidate.value?.opening?.statistics?.averageSkillScores.map(
    (skill) => ({ label: skill.skill.name, value: skill.score.value })
  );
});
</script>

<style scoped lang="scss">
.candidate-details {
  &__info {
    display: flex;
    flex-direction: column;
    &__name {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -1.5%;
    }
    &__email {
      font-size: 24px;
      line-height: 32px;
      color: var(--color-text-secondary);
      letter-spacing: -0.015em;
    }
  }
  &__interview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 264px);
    grid-gap: 24px;
    margin-top: 100px;
  }
  &__interview-grid__item {
    padding: 20px;
    background: cornsilk;
    border-radius: 12px;
    width: 264px;
  }
  &__overview {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 264px 552px;
    grid-gap: 24px;
    &__score {
      border: 1px solid #ccc;
      border-radius: 12px;
      background-color: green;
      padding: 10px;
    }
    &__skills {
      border: 1px solid #ccc;
      border-radius: 12px;
      background-color: green;
      padding: 10px;
      display: grid;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      &__skill {
        border: 1px solid grey;
        background-color: paleturquoise;
        padding: 2px;
        display: inline-block;
        padding: 8px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 12px;
      }
    }
  }
}
</style>
