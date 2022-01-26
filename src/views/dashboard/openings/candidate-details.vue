<template>
  <div class="candidate-details">
    <div v-if="candidate.reference">
      <div class="candidate-details__header">
        <div class="candidate-details__info">
          <div class="candidate-details__info__name">{{ candidate.name }}</div>
          <div class="candidate-details__info__email">
            {{ candidate.email }}
          </div>
        </div>
        <div class="candidate-details__header__button-group">
          <hp-button
            class="candidate-details__header__button-group__button"
            label="Compare"
          ></hp-button>
          <hp-button icon="pencil"></hp-button>
        </div>
      </div>
      <div class="candidate-details__overview">
        <div class="candidate-details__overview__score">
          <div class="candidate-details__overview__score-container">
            <div class="candidate-details__overview__score__average">
              {{ candidate.opening.statistics.averageScore }}
            </div>
            <div class="candidate-details__overview__score__current">
              Current score
            </div>
            <div class="candidate-details__overview__score__average-score">
              The average score is 3.5 <hp-icon name="arrow-top"></hp-icon>
            </div>
          </div>
        </div>
        <div class="candidate-details__overview__skill-container">
          <div class="candidate-details__overview__skills-title">
            Evaluated skills
            <hp-badge
              class="candidate-details__overview__skills-title__badge"
              icon="skills"
              :content="skillList.length"
            ></hp-badge>
          </div>
          <div class="candidate-details__overview__skills">
            <ol
              class="candidate-details__overview__skills__skill"
              v-for="skill in skillList"
            >
              {{
                skill.label
              }}
              <hp-badge
                class="candidate-details__overview__skills__skill__badge"
                type="positive"
                :content="skill.value"
              ></hp-badge>
            </ol>
          </div>
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

import HpButton from "@/components/hp-button.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpIcon from "@/components/hp-icon.vue";

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
  if (!candidate.value.opening?.statistics?.candidateSkillScores) {
    return [];
  }
  return candidate.value?.opening?.statistics?.candidateSkillScores.map(
    (skill) => ({ label: skill.skill.name, value: skill.score.value })
  );
});
</script>

<style scoped lang="scss">
.candidate-details {
  &__header {
    display: flex;
    justify-content: space-between;
    &__button-group {
      display: flex;
      align-items: center;
      &__button {
        margin-right: 8px;
      }
    }
  }
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
    grid-template-columns: 264px auto;
    grid-gap: 24px;
    &__score-container {
      display: flex;
      flex-direction: column;
      padding: 16px;
      height: 100%;
    }
    &__score {
      border: 1px solid #ccc;
      border-radius: 12px;
      background: var(--color-background-positive);
      border: 1px solid var(--color-border-positive);
      color: var(--color-forground-positive);
      height: 232px;
      font-size: 14px;
      line-height: 20px;
      &__average {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
      }
      &__current {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.015em;
        flex: 1;
      }
      &__average-score {
        display: flex;
      }
    }
    &__skill-container {
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 16px;
      font-size: 12px;
    }
    &__skills-title {
      display: flex;
      align-items: center;
      font-weight: 500;
      margin-bottom: 16px;
      &__badge {
        margin-left: 8px;
      }
    }
    &__skills {
      display: grid;
      display: flex;
      flex-wrap: wrap;
      &__skill {
        border: 1px solid var(--color-border);
        background-color: var(--color-panel);
        padding: 6px;
        border-radius: 8px;
        margin-right: 8px;
        margin-bottom: 8px;
        &__badge {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
