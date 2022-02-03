<template>
  <div class="questions">
    <transition name="question-component-transition" mode="out-in">
      <component
        :is="currentComponent"
        :handleClose="handleClose"
        @handleTabChange="
          isCurrentViewQuestionList = !isCurrentViewQuestionList
        "
      ></component>
    </transition>
  </div>
</template>

<script setup>
// Vendor
import { ref, computed } from "vue";

// Views
import QuestionList from "@/views/dashboard/opening/questions/question-list.vue";
import NewQuestion from "@/views/dashboard/opening/questions/new-question.vue";

const props = defineProps({
  handleClose: {
    type: Function,
  },
});

const isCurrentViewQuestionList = ref(true);
const emits = defineEmits(["updateQuestionList"]);

const currentComponent = computed(() => {
  return isCurrentViewQuestionList.value ? QuestionList : NewQuestion;
});
</script>

<style lang="scss">
.questions {
}
.question-component-transition-enter-active,
.question-component-transition-leave-active {
  transition: transform 0.15s linear, opacity 0.15s linear;
}

.question-component-transition-enter-from,
.question-component-transition-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
