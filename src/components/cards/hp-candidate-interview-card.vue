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
  <div v-if="interview.interview.terminated">
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="user"
        :size="15"
      ></hp-icon>
      {{ interview.interview.interviewerName }}
    </div>
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="calendar"
        :size="15"
      ></hp-icon>

      {{ formatDate(interview.interview.terminated) }}
    </div>
    <div class="candidate-details__interview-grid__item__actions">
      <hp-button
        label="View full results"
        :to="`/opening/${route.params.openingRef}/results/${interview.interview.token}`"
      ></hp-button>
    </div>
  </div>
  <div
    class="candidate-details__interview-grid__item__progress-wrapper"
    v-else-if="interview.interview.started && !interview.interview.terminated"
  >
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="loader"
        :size="15"
      ></hp-icon>
      In progress with {{ interview.interview.interviewerName }}
    </div>
    <div class="candidate-details__interview-grid__item__icon-text">
      <hp-icon
        class="candidate-details__interview-grid__item__icon-text__icon"
        name="chronometer"
        :size="15"
      ></hp-icon>

      Started
      {{ formatMinutesAgo(interview.interview.started) }}
    </div>
    <hp-button
      :href="calculateInterviewLink(interview)"
      label="Join interview in progress"
      class="candidate-details__interview-grid__item__actions"
    ></hp-button>
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
import { formatDistance, format } from "date-fns";

//Components
import HpBadge from "@/components/hp-badge.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpButton from "@/components/hp-button.vue";

//Composables
import useToast from "@/composables/useToast";

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

const formatMinutesAgo = (date) => {
  const distance = formatDistance(new Date(date), Date.now(), {
    addSuffix: true,
  });

  return distance;
};

const formatDate = (date) => {
  return format(new Date(date), "dd MMMM, yyyy");
};

const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

const isNextAction = (template, templates) => {
  const nextRef = templates.find((t) => {
    return !t.interview?.started;
  }).interview?.token;
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
</script>

<style lang="scss"></style>
