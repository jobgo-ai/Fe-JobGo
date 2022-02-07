<template>
  <div v-if="interview.token" class="results">
    <div class="results__details">
      <p class="results__details__candidate">{{ candidate.name }}</p>
      <h2 class="results__details__interview-name">
        {{ interview.template.name }}
      </h2>
      <div class="results__details__stats">
        <div class="results__details__stats__stat">
          <hp-icon
            class="results__details__stats__stat__icon"
            name="user"
          ></hp-icon>
          {{ interview.interviewerName || "Anon" }}
        </div>
        <div class="results__details__stats__stat">
          <hp-icon
            class="results__details__stats__stat__icon"
            name="chronometer"
          ></hp-icon>
          {{ timeTaken }} minutes
        </div>
        <div class="results__details__stats__stat">
          <hp-icon
            class="results__details__stats__stat__icon"
            name="calendar"
          ></hp-icon>
          {{ createdTime }}
        </div>
      </div>
      <div class="results__details__grid">
        <div
          :class="`results__details__score results__details__score--positive`"
        >
          <div class="results__details__score-container">
            <div class="results__details__score__average">
              {{ interview.score }}
            </div>
            <div class="results__details__score__current">Score</div>
            <div class="results__details__score__average-score">
              The average score is 2.1
              <hp-icon name="arrow-top"></hp-icon>
            </div>
          </div>
        </div>
        <div :class="`results__details__score`">
          <div class="results__details__score-container">
            <div class="results__details__score__average">100%</div>
            <div class="results__details__score__current">Completion rate</div>
            <div class="results__details__score__average-score">
              The average score is 90%
              <hp-icon name="arrow-top"></hp-icon>
            </div>
          </div>
        </div>
        <div class="results__details__skill-container">
          <div class="results__details__skills-title">Evaluated skills</div>
          <ol class="results__details__skills">
            <li class="results__details__skills__skill">
              Pizza eating
              <hp-badge
                class="results__details__skills__skill__badge"
                :content="4"
              ></hp-badge>
            </li>
            <li class="results__details__skills__skill">
              CHANGE ME
              <hp-badge
                class="results__details__skills__skill__badge"
                :content="4"
              ></hp-badge>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="results__questions">
      <div class="results__questions__title">Questions</div>
      <ol class="results__questions__list">
        <li
          v-for="(interaction, index) in interactionList"
          class="results__questions__container"
        >
          <div class="results__questions__container__header">
            <hp-badge icon="questions" :content="index + 1" />
            <div
              class="
                results__questions__container__header__little-badge
                results__questions__container__header__little-badge--positive
              "
            >
              {{ interaction.interaction.answer.value }} / 5
            </div>
          </div>
          <div class="results__questions__container__content">
            {{ interaction.question.content }}
          </div>
          <hp-question-card-stats
            hasTooltips
            :question="interaction.question"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
//Vendor
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { DateTime } from "luxon";

//Components
import HpIcon from "@/components/hp-icon.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpQuestionCardStats from "@/components/cards/hp-question-card-stats.vue";

// Composables
import { useGet } from "@/composables/useHttp";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";

const props = defineProps({
  opening: {
    type: Object,
    default: () => {},
  },
});

const { setBreadcrumbs } = useBreadcrumbs();
const router = useRouter();
const route = useRoute();
const interview = ref({});
const candidate = ref({});

onMounted(async () => {
  const getInterview = useGet(`interviews/${route.params.resultsRef}`);
  await getInterview.get();
  interview.value = getInterview.data.value.interview;
  candidate.value = getInterview.data.value.interview.candidate;

  setBreadcrumbs([
    {
      label: "Openings",
      to: "/openings",
    },
    {
      label: props.opening.name,
      to: `/opening/${props.opening.reference}/edit`,
    },
    {
      label: interview.value.candidate.name,
      to: ``,
    },
  ]);
});

const createdTime = computed(() => {
  const startTime = DateTime.fromISO(interview.value.started).toLocaleString(
    DateTime.DATETIME_MED
  );
  return startTime;
});

const timeTaken = computed(() => {
  return DateTime.fromISO(interview.value.terminated)
    .diff(DateTime.fromISO(interview.value.started), "minutes")
    .toFormat("m");
});

const handleArchiveInterview = async () => {
  const deleteInterview = useDelete(`interviews/${interview.value.token}`);
  await deleteInterview.remove();
  isInterviewArchiveConfirmOpen.value = false;
  router.push(`/candidates/${route.params.candidateRef}`);
};

const interactionList = computed(() => {
  return interview.value.interactions.filter((interaction) => {
    return interaction.question.type?.slug === "open";
  });
});
console.log(interactionList);
</script>

<swag lang="scss">
.results {
  display: flex;
  &__details {
    &__skill-container {
      border: 1px solid var(--color-border);
      border-radius: $border-radius-lg;
      padding: 16px;
      font-size: 12px;
      grid-column: 1 / 3;
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
    flex-shrink: 0;
    width: 552px;
    margin-right: 16px;
    &__candidate {
      @include text-h4;
      color: var(--color-text-secondary);
      font-weight: 300;
    }
    &__interview-name {
      @include text-h2;
      color: var(--color-text-primary);
      font-weight: 500;
      margin-bottom: 26px;
    }
    &__stats {
      display: flex;
      margin-bottom: 16px;
      &__stat {
        display: flex;
        align-items: center;
        margin-right: 16px;
        &__icon {
          color: var(--color-text-secondary);
          margin-right: 6px;
        }
      }
    }
    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
      &__item {
        @include flyout;
      }
    }
    &__score-container {
      display: flex;
      flex-direction: column;
      padding: 16px;
      height: 100%;
    }
    &__score {
      border: 1px solid var(--color-border);
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

  &__questions {
    @include flyout;
    height: calc(100vh - 106px);
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 0px;
    padding-bottom: 0px;
    width: 100%;
    background: var(--color-panel);

    &__title {
      @include text-h5;
      color: var(--color-text-primary);
      font-weight: 500;
      margin-top: 12px;
      margin-bottom: 16px;
    }

    &__container {
      @include flyout;
      margin-bottom: 16px;
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__little-badge {
          padding: 2px 6px;
          border: $border;
          border-radius: 6px;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: -0.015em;
          font-feature-settings: "tnum" on, "lnum" on;
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
        }
      }
      &__content {
        @include text-h5;
        font-weight: 500;
        margin-bottom: 16px;
        margin-top: 16px;
      }
    }
  }
}
</swag>
