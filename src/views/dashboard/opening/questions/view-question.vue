<template>
  <div v-if="getQuestion.loading" class="view-question">
    <div class="view-question__section">
      <div class="view-question__header">Question</div>
      <div class="view-question__content">
        {{ question.content }}
        <hp-badge
          icon="chronometer"
          :content="(question.duration / 60).toFixed()"
        />
      </div>
    </div>
    <div class="view-question__section" v-if="question.guidelines">
      <div class="view-question__header">Guidelines</div>
      <ol class="view-question__guidelines">
        <li
          class="view-question__guideline"
          v-for="guideline in question.guidelines"
        >
          {{ guideline }}
        </li>
      </ol>
    </div>
    <div class="view-question__section" v-if="question.skills?.length > 0">
      <div class="view-question__header">Skills</div>
      <ul class="view-question__tag-list">
        <li class="view-question__tag" v-for="skill in question.skills">
          {{ skill.name }}
        </li>
      </ul>
    </div>
    <div class="view-question__section" v-if="question.jobLevels?.length > 0">
      <div class="view-question__header">Levels</div>
      <ul class="view-question__tag-list">
        <li class="view-question__tag" v-for="level in question.jobLevels">
          {{ level.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
//Vendor
import { ref, computed, onMounted, watchEffect } from "vue";

// Components
import HpBadge from "@/components/hp-badge.vue";
import HpIcon from "@/components/hp-icon.vue";

// Composables
import { useGet } from "@/composables/useHttp";

const props = defineProps({
  question: {
    type: Object,
  },
});

const question = ref({});

const getQuestion = useGet(`questions/${props.question.reference}`);

onMounted(async () => {
  await getQuestion.get();
  question.value = getQuestion.data.value.question;
});
</script>

<style lang="scss">
.view-question {
  display: flex;
  flex-direction: column;
  padding: 24px;

  &__header {
    @include text-h5;
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-top: 16px;
    margin-bottom: 16px;
  }
  &__content {
    font-weight: 500;
    @include text-h4;
    display: flex;
    justify-content: space-between;
  }
  &__section {
    padding-bottom: 16px;
    border-bottom: 1px dashed var(--color-border);
    &:last-child {
      border-bottom: none;
    }
  }
  &__guideline {
    padding: 16px 12px;
    background: var(--color-panel);
    border: $border;
    border-radius: $border-radius-sm;
  }
  &__tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  &__tag {
    padding: 6px;
    background-color: var(--color-panel);
    border: $border;
    border-radius: $border-radius-sm;
  }
}
</style>