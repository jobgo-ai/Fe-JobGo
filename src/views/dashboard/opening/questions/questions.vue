<template>
  <div>
    <hp-button
      type="button"
      @handleClick="isCurrentViewQuestionList = !isCurrentViewQuestionList"
      label="change q"
    ></hp-button>
    <question-list
      @updateList="emits('updateQuestionList')"
      v-if="isCurrentViewQuestionList"
    />
    <new-question
      @updateList="emits('updateQuestionList')"
      v-if="!isCurrentViewQuestionList"
    />
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";

// Components
import HpButton from "@/components/hp-button.vue";

// Views
import QuestionList from "@/views/dashboard/opening/questions/question-list.vue";
import NewQuestion from "@/views/dashboard/opening/questions/new-question.vue";

const isCurrentViewQuestionList = ref(true);
const emits = defineEmits(["updateQuestionList"]);
</script>
