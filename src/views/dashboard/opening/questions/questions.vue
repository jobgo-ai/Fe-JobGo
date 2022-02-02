<template>
  <div class="questions">
    <question-list
      @updateList="emits('updateQuestionList')"
      v-if="isCurrentViewQuestionList"
      @handleTabChange="isCurrentViewQuestionList = !isCurrentViewQuestionList"
    />
    <new-question
      @updateList="emits('updateQuestionList')"
      @handleTabChange="isCurrentViewQuestionList = !isCurrentViewQuestionList"
      v-if="!isCurrentViewQuestionList"
    />
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";

// Views
import QuestionList from "@/views/dashboard/opening/questions/question-list.vue";
import NewQuestion from "@/views/dashboard/opening/questions/new-question.vue";

const isCurrentViewQuestionList = ref(true);
const emits = defineEmits(["updateQuestionList"]);
</script>

<style lang="scss">
.questions {
  max-width: 480px;
}
</style>
