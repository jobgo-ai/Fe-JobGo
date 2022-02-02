<template>
  <div class="question-list">
    <div class="question-list__header">
      <h2 class="question-list__title">Add question</h2>
      <p class="question-list__subtitle">
        Select a template or create your own questions.
      </p>
      <form>
        <hp-input
          class="question-list__search"
          name="search"
          variant="search"
          icon="search"
          standalone
        />
        <div class="question-list__filters">
          <hp-multi-select
            class="question-list__filters__dropdown"
            label="Skills"
            :options="skillOptions"
            name="skills"
            searchable
            standalone
            :onSearch="searchFunction"
            v-model="filter.skills"
          ></hp-multi-select>
          <hp-multi-select
            :options="jobLevelOptions"
            class="question-list__filters__dropdown"
            label="Experience levels"
            standalone
            name="levels"
            v-model="filter.jobLevels"
          ></hp-multi-select>
        </div>
        <hp-button
          dropzone
          icon="plus"
          label="Start from scratch"
          @handleClick="$emit('handleTabChange')"
        />
      </form>
    </div>
    <ol
      ref="listContainer"
      :style="{ height: `${listContainerMaxHeight}px` }"
      class="question-list__list-container"
    >
      <hp-question-card
        :question="question"
        :key="question.id"
        v-for="question in questions"
      ></hp-question-card>
    </ol>
  </div>
</template>

<script setup>
// Vendor
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

// Components
import HpButton from "@/components/hp-button.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpMultiSelect from "@/components/form/hp-multi-select.vue";
import HpQuestionCard from "@/components/hp-question-card.vue";

// Hooks
import { useGet, usePost } from "@/hooks/useHttp";
import useSkillSearch from "@/hooks/useSkillSearch";
import useConstants from "@/hooks/useConstants";

const emits = defineEmits(["handleTabChange"]);

const listContainer = ref(null);
const listContainerMaxHeight = ref(200);

const filter = ref({ search: "", skills: [], jobLevels: [] });

const skillOptions = ref([]);

const { handleSkillSearch } = useSkillSearch();
const { jobLevels } = useConstants();

const jobLevelOptions = computed(() => {
  return jobLevels.value.map((j) => j.name);
});
const searchFunction = async (value) => {
  skillOptions.value = await handleSkillSearch(value);
};

let next = null;
const questions = ref([]);
const limit = 20;

onMounted(async () => {
  skillOptions.value = await handleSkillSearch("");
  listContainerMaxHeight.value =
    window.innerHeight - listContainer.value.getBoundingClientRect().top;
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
  if (filter.value.jobLevels.length > 0) {
    params.append("job-levels", filter.value.experience.join(","));
  }
  if (filter.value.skills.length > 0) {
    params.append("skills", filter.value.skills.join(","));
  }
  if (filter.value.search !== "") {
    params.append("search", filter.value.search);
  }
  return `${url}?${params.toString()}`;
};

const getQuestions = async () => {
  questions.value = [];
  const { data, get } = useGet(getUrl(false));
  await get();
  next = data.value.next;
  questions.value = data.value.questions;
};
getQuestions();

const route = useRoute();

const addToInterview = async (reference) => {
  const postTemplateQuestion = usePost(
    `templates/${route.params.interviewRef}/questions`
  );
  await postTemplateQuestion.post({
    question: reference,
  });
};
</script>

<style lang="scss" scoped>
.question-list {
  display: flex;
  flex-direction: column;
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
}
</style>
