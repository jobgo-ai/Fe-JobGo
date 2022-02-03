<template>
  <li class="hp-question-card">
    <div class="hp-question-card__content">
      {{ question.content }}
    </div>
    <div class="hp-question-card__stats">
      <div class="hp-question-card__stats__stat">
        <hp-icon
          class="hp-question-card__stats__stat__icon"
          name="chronometer"
        ></hp-icon>
        {{ question.duration / 60 }}
        Minutes
      </div>
      <div class="hp-question-card__stats__stat">
        <hp-icon
          class="hp-question-card__stats__stat__icon"
          name="skills"
        ></hp-icon>
        {{ question.jobLevels.length }}
        Levels
      </div>
      <div class="hp-question-card__stats__stat">
        <hp-icon
          class="hp-question-card__stats__stat__icon"
          name="skills"
        ></hp-icon>
        {{ question.skills.length }}
        Skills
      </div>
    </div>
    <div class="hp-question-card__actions">
      <hp-button
        class="hp-question-card__actions__button"
        label="Add question"
        @handleClick="$emit('handleAddToInterview', question)"
      ></hp-button
      ><hp-button icon="eye"></hp-button>
    </div>
  </li>
</template>

<script setup>
import HpButton from "@/components/hp-button.vue";
import HpIcon from "@/components/hp-icon.vue";
const props = defineProps({
  question: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["handleAddToInterview"]);

const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};
</script>

<style lang="scss">
.hp-question-card {
  width: 100%;
  list-style: none;
  border-radius: $border-radius-sm;
  border: $border;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 6px;
  &__content {
    font-weight: 500;
    @include text-h5;
    margin-bottom: 16px;
  }
  &__stats {
    display: flex;
    margin-bottom: 16px;
    &__stat {
      margin-right: 16px;
      display: flex;
      align-items: center;
      &__icon {
        margin-right: 6px;
        color: var(--color-text-secondary);
      }
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    &__button {
      margin-right: 6px;
    }
  }
}
</style>
