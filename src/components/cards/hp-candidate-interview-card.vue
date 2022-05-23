<template>
  <div class="candidate-details__interview-grid__item__header">
    <div
      class="candidate-details__interview-grid__item__header__badge-container"
    >
      <hp-badge icon="layers" :content="index + 1"></hp-badge>
      <hp-badge
        v-if="interview.statistics.candidateScore"
        :type="
          calculateColor(
            interview.statistics.candidateScore,
            interview.statistics.averageTemplateScore
          )
        "
        :content="interview.statistics.candidateScore.toFixed(2)"
      ></hp-badge>
    </div>
    <div class="candidate-details__interview-grid__item__header__title">
      {{ interview.name }}
    </div>
  </div>
  <div
    v-if="inProgressInterview"
    class="candidate-details__interview-grid__item__progress-wrapper"
  >
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="user"
        :size="15"
      ></hp-icon>
      {{ inProgressInterviews.length }} interviewers
    </div>
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="loader"
        :size="15"
      ></hp-icon>

      In progress
    </div>
    <div class="candidate-details__interview-grid__item__actions">
      <hp-dropdown
        class="candidate-interview-card__dropdown"
        :label="'In progress'"
        left
      >
        <template v-slot:dropdown>
          <ul class="hp-multi-select__flyout__options">
            <a
              v-for="evaluation in inProgressInterviews"
              target="_blank"
              :href="generateInProgressInterviewLink(evaluation.token)"
            >
              <li class="hp-multi-select__flyout__options__option">
                {{ evaluation.interviewerName }}
              </li>
            </a>
          </ul>
        </template>
      </hp-dropdown>
      <hp-button
        class="candidate-details__interview-grid__item__actions--icon"
        icon="copy"
        @click="copyInterview(interview)"
      ></hp-button>
    </div>
  </div>
  <div v-else-if="hasTerminatedInterview">
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="user"
        :size="15"
      ></hp-icon>
      {{ interview.interview.evaluations[0].interviewerName }}
    </div>
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="calendar"
        :size="15"
      ></hp-icon>

      {{ formatDate(interview.interview.evaluations[0].terminated) }}
    </div>
    <div class="candidate-details__interview-grid__item__actions">
      <hp-button
        label="View full results"
        :to="`/opening/${route.params.openingRef}/results/${interview.interview.token}/${interview.interview.evaluations[0].token}`"
      ></hp-button>
      <hp-button
        class="candidate-details__interview-grid__item__actions--icon"
        icon="copy"
        @click="copyInterview(interview)"
      ></hp-button>
    </div>
  </div>
  <div v-else>
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="chronometer"
        :size="15"
      ></hp-icon>
      {{ secondsToMinutes(interview.statistics.duration) }} minutes
    </div>
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="questions"
        :size="15"
      ></hp-icon>

      {{ interview.statistics.questions }} questions
    </div>
    <div
      class="candidate-details__interview-grid__item__actions"
      v-if="isNextAction(interview, opening.templates)"
    >
      <hp-button
        :href="calculateInterviewLink(interview)"
        primary
        label="Start interview"
      ></hp-button>
      <hp-button
        class="candidate-details__interview-grid__item__actions--icon"
        icon="copy"
        @click="copyInterview(interview)"
      ></hp-button>
    </div>
    <div class="candidate-details__interview-grid__item__actions" v-else>
      <hp-button
        @click="copyInterview(interview)"
        icon="copy"
        label="Copy link"
      ></hp-button>
    </div>
  </div>
</template>

<script setup>
//Vendor
import { computed } from "vue";
import { useRoute } from "vue-router";
import { formatDistance, format } from "date-fns";

//Components
import HpBadge from "@/components/hp-badge.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpButton from "@/components/hp-button.vue";
import HpDropdown from "@/components/hp-dropdown.vue";

//Composables
import useToast from "@/composables/useToast";

const route = useRoute();
const { setToast } = useToast();

const props = defineProps({
  interview: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  opening: {
    type: Object,
    required: true,
  },
});

const inProgressInterview = computed(() => {
  return props.interview.interview.evaluations.find(
    (i) => i.started && !i.terminated
  );
});

const inProgressInterviews = computed(() => {
  return props.interview.interview.evaluations.filter(
    (i) => i.started && !i.terminated
  );
});

const hasTerminatedInterview = computed(() => {
  return props.interview.interview.evaluations.some((i) => i.terminated);
});

const URL = import.meta.env.VITE_INTERVIEW_URL;

const calculateColor = (score, avgScore) => {
  if (!score || score === "0.0") {
    return "default";
  }
  if (score > avgScore) {
    return "positive";
  } else if (avgScore > score) {
    return "negative";
  } else {
    return "default";
  }
};

const formatDate = (date) => {
  return format(new Date(date), "dd MMMM, yyyy");
};

const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

const isNextAction = (template, templates) => {
  console.log(templates);
  const nextRef = templates.find((t) => {
    return !t.interview?.evaluations.some((e) => e.started);
  }).interview?.token;

  console.log(template);
  console.log(nextRef);
  return template.interview.token === nextRef;
};

const copyInterview = (interview) => {
  const interviewLink = `${URL}/token/${interview.interview.token}`;
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(interviewLink);
      setToast({
        type: "positive",
        title: "Copy that!",
        message: `Interview link copied to clipboard`,
      });
    }
  });
};

const calculateInterviewLink = (interview) => {
  const URL = `${import.meta.env.VITE_INTERVIEW_URL}/token/${
    interview?.interview?.token
  }`;
  return URL;
};

const generateInProgressInterviewLink = (token) => {
  return `${import.meta.env.VITE_INTERVIEW_URL}/token/${
    props.interview.interview.token
  }/${token}`;
};
</script>

<style lang="scss">
.candidate-interview-card {
  &__dropdown {
    margin-right: 8px;
  }
}
</style>
