<template>
  <div>
    <div class="candidate-modal__dropzone">
      <p class="candidate-modal__dropzone__description">
        Upload a csv of questions, no headers required
        <a
          class="candidate-modal__header__subtitle__link"
          href="/csvs/bulk-question-example.csv"
          download="bulk-question-example.csv"
          >Download example file</a
        >.
      </p>
      <hp-dropzone
        @change="handleFileUpload"
        accept=".csv"
        loadingLabel="Candidates processing"
        label="Upload a csv file to add multiple candidates"
      >
      </hp-dropzone>
    </div>
    <div class="candidate-modal__actions">
      <hp-button
        primary
        type="button"
        @handleClick="handleBulkAdd"
        :isLoading="isBulkQuestionsProcessing"
        :isDisabled="isBulkQuestionsProcessing || !csv.name"
        label="Upload csv"
      ></hp-button>
    </div>
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";
import { useRoute } from "vue-router";
import Papa from "papaparse";

// Components
import HpDropzone from "@/components/hp-dropzone.vue";
import HpButton from "@/components/hp-button.vue";

// Composables
import { usePost } from "@/composables/useHttp";

const isBulkQuestionsProcessing = ref(false);
const csv = ref({});

const handleFileUpload = (file) => {
  csv.value = file;
};

const emits = defineEmits(["questionsAdded"]);

const route = useRoute();

const handleBulkAdd = async () => {
  const formattedValues = {
    scoring: "likert",
    type: "open",
    duration: 5 * 60,
    skills: [],
    guidelines: [],
  };
  isBulkQuestionsProcessing.value = true;
  Papa.parse(csv.value, {
    complete: async (csvQuestions) => {
      console.log(csvQuestions.data);
      const reqs = csvQuestions.data.map(async (question) => {
        const postQuestion = usePost("questions");
        await postQuestion.post({
          question: {
            ...formattedValues,
            content: question[0],
            templates: [route.params.interviewRef],
          },
        });
        const postTemplateQuestion = usePost(
          `templates/${route.params.interviewRef}/questions`
        );
        return await postTemplateQuestion.post({
          question: postQuestion.data.value.question.reference,
        });
      });

      await Promise.all(reqs);
      emits("questionsAdded");
      isBulkQuestionsProcessing.value = false;
    },
  });
};
</script>

<styles></styles>
