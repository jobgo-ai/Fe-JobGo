<template>
  <div class="question-list">
    <div class="question-list__header">
      <h2 class="question-list__title">Add question</h2>
      <p class="question-list__subtitle">
        Select a template or create your own questions.
      </p>
      <hp-input
        class="question-list__search"
        name="search"
        variant="search"
        icon="search"
        placeholder="Search by content"
        v-model="search"
        standalone
      />
      <hp-skill-search
        placeholder="Search by skill"
        @onChange="handleSkillSelection"
      />
    </div>
    <ol
      ref="listContainer"
      :style="{ height: `${listContainerMaxHeight}px` }"
      class="question-list__list-container"
    >
      <div v-if="!isQuestionsLoading && questions.length > 0">
        <hp-question-card
          :question="question"
          :key="question.id"
          v-for="question in questions"
          @handleAddToInterview="addToInterview"
        ></hp-question-card>
      </div>
      <div
        class="question-list__empty-state"
        v-if="!isQuestionsLoading && questions.length === 0"
      >
        <empty-state />
        No questions found
      </div>
      <hp-spinner content size="24" v-if="isQuestionsLoading" />
    </ol>
  </div>
</template>

<script setup>
// Vendor
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDebounce } from "@vueuse/core";

// Components
import HpInput from "@/components/form/hp-input.vue";
import HpQuestionCard from "@/components/cards/hp-question-card.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import EmptyState from "@/assets/abstracts/empty-state.svg";
import HpSkillSearch from "@/components/hp-skill-search.vue";

// Composables
import useToast from "@/composables/useToast";
import { useGet, usePost } from "@/composables/useHttp";
import useInterviews from "@/composables/useInterviews";

const props = defineProps({
  handleClose: {
    type: Function,
    required: true,
  },
});

const { setToast } = useToast();

const emits = defineEmits(["handleTabChange", "questionAdded"]);

const isQuestionsLoading = ref(true);
const listContainer = ref(null);
const listContainerMaxHeight = ref(200);

const search = ref("");
const route = useRoute();

const { setInterview } = useInterviews();

const filter = ref({
  search: useDebounce(search, 300),
  skill: null,
});

let next = null;
const questions = ref([]);
const limit = 20;

const handleSkillSelection = (skill) => {
  filter.value.skill = skill.value;
};

onMounted(async () => {
  listContainerMaxHeight.value =
    window.innerHeight - listContainer.value?.getBoundingClientRect().top;
});

watch(
  () => filter.value,
  () => {
    getQuestions();
  },
  { deep: true }
);

const getUrl = (loadingMore) => {
  let url = `questions`;
  var params = new URLSearchParams([["limit", limit]]);
  if (loadingMore) {
    params.append("offset", next);
  }
  if (filter.value.skill) {
    params.append("skill", filter.value.skill);
  }
  if (filter.value.search !== "") {
    params.append("search", filter.value.search);
  }
  if (route.params.interviewRef) {
    params.append("exclude-template", [route.params.interviewRef]);
  }

  return `${url}?${params.toString()}`;
};

const getQuestions = async () => {
  isQuestionsLoading.value = true;
  questions.value = [];
  const { data, get } = useGet(getUrl(false));
  await get();
  next = data.value.next;
  questions.value = data.value.questions;
  isQuestionsLoading.value = false;
};
getQuestions();

const addToInterview = async (question) => {
  const postTemplateQuestion = usePost(
    `templates/${route.params.interviewRef}/questions`
  );
  await postTemplateQuestion.post({
    question: question.reference,
  });
  setInterview(postTemplateQuestion.data.value.template);
  setToast({
    type: "positive",
    title: "Well done!",
    message: `Question added to interview`,
  });
  emits("questionAdded");
  props.handleClose();
};
</script>

<style lang="scss" scoped>
.question-list {
  display: flex;
  flex-direction: column;
  padding: 16px;
  &__header {
    margin-bottom: 16px;
  }
  &__title {
    @include text-h4;
    font-weight: 500;
  }
  &__subtitle {
    @include text-h5;
    color: var(--color-text-secondary);
  }
  &__search {
    margin-top: 16px;
  }
  &__filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px dashed var(--color-border);
    &__dropdown {
      display: flex;
    }
  }
  &__list-container {
    flex-grow: 1;
    padding-bottom: 56px;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  &__empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 200px;
    margin-top: 24px;
    color: var(--color-text-secondary);
  }
}
</style>
