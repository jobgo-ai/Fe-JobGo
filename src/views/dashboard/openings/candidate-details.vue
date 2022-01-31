<template>
  <div class="candidate-details">
    <hp-modal
      :isOpen="isEditCandidateModalOpen"
      @close="isEditCandidateModalOpen = false"
    >
      <candidate-modal
        @close="isEditCandidateModalOpen = false"
        :opening="opening"
        :candidate="candidate"
      />
    </hp-modal>
    <transition name="candidate-details-transition">
      <div v-if="!isCandidateLoading">
        <div class="candidate-details__header">
          <div class="candidate-details__info">
            <div class="candidate-details__info__name">
              {{ candidate.name }}
            </div>
            <div class="candidate-details__info__email">
              {{ candidate.email }}
            </div>
          </div>
          <div class="candidate-details__header__button-group">
            <hp-button
              class="candidate-details__header__button-group__button"
              label="Compare"
              :to="`/opening/${route.params.openingRef}/compare`"
            ></hp-button>
            <hp-button
              @click="isEditCandidateModalOpen = true"
              icon="pencil"
            ></hp-button>
          </div>
        </div>
        <div class="candidate-details__overview">
          <div
            :class="`candidate-details__overview__score candidate-details__overview__score--${calculateColor(
              candidate.opening.statistics.candidateScore,
              candidate.opening.statistics.averageOpeningScore
            )}`"
          >
            <div class="candidate-details__overview__score-container">
              <div class="candidate-details__overview__score__average">
                {{ candidate.opening.statistics.candidateScore ?? "0.0" }}
              </div>
              <div class="candidate-details__overview__score__current">
                Current score
              </div>
              <div class="candidate-details__overview__score__average-score">
                The average score is
                {{ candidate.opening.statistics.averageOpeningScore }}
                <hp-icon name="arrow-top"></hp-icon>
              </div>
            </div>
          </div>
          <div class="candidate-details__overview__skill-container">
            <div class="candidate-details__overview__skills-title">
              Evaluated skills
              <hp-badge
                class="candidate-details__overview__skills-title__badge"
                icon="skills"
                :content="skillList ? skillList.length : 0"
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
                  :type="
                    calculateColor(
                      skill.value,
                      candidate.opening.statistics.averageOpeningScore
                    )
                  "
                  :content="skill.value"
                ></hp-badge>
              </ol>
            </div>
          </div>
        </div>
        <div class="candidate-details__interviews">
          <div class="candidate-details__interviews__header">
            <div>
              <h3 class="candidate-details__interviews__title">Interviews</h3>
              <p class="candidate-details__interviews__subtitle">
                View and manage all interviews
              </p>
            </div>
            <hp-circular-badge
              :upper="candidate.opening.templates.length"
              :lower="completedTemplates"
            ></hp-circular-badge>
          </div>
          <ul class="candidate-details__interview-grid">
            <li
              :class="createClasses(interview)"
              v-for="(interview, index) in opening.templates"
            >
              <div class="candidate-details__interview-grid__item__header">
                <div
                  class="
                    candidate-details__interview-grid__item__header__badge-container
                  "
                >
                  <hp-badge icon="layers" :content="index + 1"></hp-badge>
                  <hp-badge
                    v-if="interview.statistics.candidateScore"
                    type="positive"
                    :content="interview.statistics.candidateScore"
                  ></hp-badge>
                </div>
                <div
                  class="candidate-details__interview-grid__item__header__title"
                >
                  {{ interview.name }}
                </div>
              </div>
              <div v-if="interview.interview.terminated">
                <div class="candidate-details__interview-grid__item__icon-text">
                  <hp-icon
                    class="
                      candidate-details__interview-grid__item__icon-text__icon
                    "
                    name="user"
                    :size="15"
                  ></hp-icon>
                  {{ interview.interview.interviewer }}
                </div>
                <div class="candidate-details__interview-grid__item__icon-text">
                  <hp-icon
                    class="
                      candidate-details__interview-grid__item__icon-text__icon
                    "
                    name="calendar"
                    :size="15"
                  ></hp-icon>

                  {{ formatDate(interview.interview.terminated) }}
                </div>
                <div class="candidate-details__interview-grid__item__actions">
                  <hp-button label="View full results"></hp-button>
                </div>
              </div>
              <div
                v-else-if="
                  interview.interview.started && !interview.interview.terminated
                "
              >
                in progress
              </div>
              <div v-else>
                <div class="candidate-details__interview-grid__item__icon-text">
                  <hp-icon
                    class="
                      candidate-details__interview-grid__item__icon-text__icon
                    "
                    name="chronometer"
                    :size="15"
                  ></hp-icon>
                  {{ secondsToMinutes(interview.statistics.duration) }} minutes
                </div>
                <div class="candidate-details__interview-grid__item__icon-text">
                  <hp-icon
                    class="
                      candidate-details__interview-grid__item__icon-text__icon
                    "
                    name="questions"
                    :size="15"
                  ></hp-icon>

                  {{ interview.statistics.questions }} questions
                </div>
                <div
                  class="candidate-details__interview-grid__item__actions"
                  v-if="isNextAction(interview, opening.templates)"
                >
                  <hp-button primary label="Start interview"></hp-button>
                  <hp-button
                    class="
                      candidate-details__interview-grid__item__actions--icon
                    "
                    icon="copy"
                  ></hp-button>
                </div>
                <div
                  class="candidate-details__interview-grid__item__actions"
                  v-else
                >
                  <hp-button icon="copy" label="Copy link"></hp-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <hp-spinner
      :size="24"
      class="candidate-details__spinner"
      v-if="isCandidateLoading"
    ></hp-spinner>
  </div>
</template>

<script setup>
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { onMounted, watch, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { DateTime } from "luxon";

import useCandidates from "@/hooks/useCandidates";

import HpButton from "@/components/hp-button.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpIcon from "@/components/hp-icon.vue";
import CandidateModal from "./candidate-modal.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpModal from "@/components/hp-modal.vue";
import HpCircularBadge from "@/components/hp-circular-badge.vue";

const props = defineProps({
  openings: {
    type: Array,
    default: [],
  },
  opening: {
    type: Object,
    default: {},
  },
});

const { fetchCandidate, candidate, isCandidateLoading } = useCandidates();

const route = useRoute();
const isEditCandidateModalOpen = ref(false);
const opening = ref({});
const URL = import.meta.env.VITE_INTERVIEW_URL;

const getCandidateDetails = async () => {
  await fetchCandidate(route.query.candidate);
  opening.value = candidate.value.opening;
  const { setBreadcrumbs } = useBreadcrumbs();
  setBreadcrumbs([
    {
      label: "Openings",
      to: "/openings",
    },
    {
      label: opening.value.name,
      to: `/openings/${opening.value.reference}`,
    },
    {
      label: candidate.value.name,
      to: `/opening/${opening.value.reference}?candidate=${candidate.value.reference}`,
    },
  ]);
};

onMounted(async () => {
  await getCandidateDetails();
});

watch(
  () => route.query.candidate,
  async () => {
    if (route.query.candidate) {
      await getCandidateDetails();
    }
  }
);

const skillList = computed(() => {
  return candidate.value?.opening?.statistics?.candidateSkillScores.map(
    (skill) => ({
      label: skill.skill.name,
      value: skill.score.value?.toFixed(1) ?? "0.0",
    })
  );
});

const formatDate = (date) => {
  return DateTime.fromISO(date).toFormat("dd LLL, yyyy");
};

const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

const createClasses = (interview) => {
  return {
    "candidate-details__interview-grid__item": true,
    "candidate-details__interview-grid__item--terminated":
      interview.interview.terminated,
  };
};

const isNextAction = (template, templates) => {
  const nextRef = templates.find((t) => {
    return !t.interview?.started;
  }).interview?.token;
  return template.interview.token === nextRef;
};

const calculateColor = (score, avgScore) => {
  if (!score || score === "0.0") {
    return "default";
  }
  if (score >= avgScore) {
    return "positive";
  } else {
    return "negative";
  }
};

const completedTemplates = computed(() => {
  return candidate.value.opening.templates.filter((t) => t.interview.terminated)
    .length;
});
</script>

<style scoped lang="scss">
.candidate-details {
  &__spinner {
    margin-top: 64px;
    display: flex;
    justify-content: center;
  }
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
  &__overview {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 264px auto;
    grid-gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px dashed var(--color-border);
    &--incomplete {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      align-items: center;
      margin-top: 24px;
      color: var(--color-text-secondary);
      padding: 12px;

      :first-child {
        margin-bottom: 12px;
      }
    }
    &__score-container {
      display: flex;
      flex-direction: column;
      padding: 16px;
      height: 100%;
    }
    &__score {
      border: 1px solid #ccc;
      border-radius: $border-radius-lg;
      height: 232px;
      font-size: 14px;
      line-height: 20px;
      &--default {
        color: var(--color-text-secondary);
        background: var(--color-panel);
        border: 1px solid var(--color-border);
      }
      &--positive {
        background: var(--color-background-positive);
        border: 1px solid var(--color-border-positive);
        color: var(--color-forground-positive);
      }
      &--negative {
        background: var(--color-background-negative);
        border: 1px solid var(--color-border-negative);
        color: var(--color-forground-negative);
      }
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
      border-radius: $border-radius-lg;
      padding: 16px;
      font-size: 12px;
    }
    &__skills-title {
      display: flex;
      align-items: center;
      font-weight: 500;
      margin-bottom: 16px;
      font-size: 16px;
      &__badge {
        margin-left: 8px;
      }
    }
    &__skills {
      display: flex;
      flex-wrap: wrap;
      &__skill {
        border: 1px solid var(--color-border);
        background-color: var(--color-panel);
        padding: 6px;
        border-radius: $border-radius-sm;
        margin-right: 8px;
        margin-bottom: 8px;
        &__badge {
          margin-left: 12px;
        }
      }
    }
  }
  &__interviews {
    padding-top: 24px;
    margin-bottom: 200px;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__title {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    &__subtitle {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: var(--color-text-secondary);
    }
  }
  &__interview-grid {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 264px);
    grid-gap: 24px;
  }
  &__interview-grid__item {
    border-radius: $border-radius-lg;
    border: 1px solid var(--color-border);
    width: 264px;
    padding: 16px;
    &--terminated {
      background: var(--color-panel);
    }
    &__header {
      &__badge-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      &__title {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 16px;
      }
    }
    &__icon-text {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      &__icon {
        margin-right: 4px;
        color: var(--color-text-secondary);
      }
    }
    &__actions {
      padding-top: 22px;
      display: flex;
      align-items: center;
      &--icon {
        color: var(--color-text-primary);
        margin-left: 6px;
      }
    }
  }
}

.candidate-details-transition-enter-active,
.candidate-details-transition-leave-active {
  transition: opacity 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.candidate-details-transition-enter-from,
.candidate-details-transition-leave-to {
  opacity: 0;
}
</style>
