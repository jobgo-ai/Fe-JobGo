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
      ></hp-button
      ><hp-button icon="eye"></hp-button>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";
import HpButton from "@/components/hp-button.vue";
import HpIcon from "@/components/hp-icon.vue";
import { useRoute, useRouter } from "vue-router";
import { usePost } from "@/hooks/useHttp";
import useToast from "@/hooks/useToast";
import useOpenings from "@/hooks/useOpenings";
const props = defineProps({
  question: {
    type: Object,
    default: () => ({}),
  },
});

const isLoading = ref(false);
const isCreatingInterview = ref(false);

const router = useRouter();
const route = useRoute();

const { setToast } = useToast();
const { fetchOpening } = useOpenings();

const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

// const handleAddToInterview = async () => {
//   isLoading.value = true;
//   const postOpening = usePost(`openings/${route.params.openingRef}/templates`);
//   const payload = {
//     template: props.template.reference,
//   };

//   await postOpening.post(payload);
//   await fetchOpening(route.params.openingRef);
//   isLoading.value = false;
//   setToast({
//     type: "positive",
//     title: "Well done!",
//     message: "Interview added to role",
//   });
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
