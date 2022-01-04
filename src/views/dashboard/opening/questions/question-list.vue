<template>
  <div>
    wsaodosaofdosa
    <ol>
      <li v-for="question in questions" :key="question.reference">
        {{ question.content }}
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useGet } from "@/hooks/useHttp";
import { ref, watch, reactive } from "vue";

let next = null;
const questions = ref([]);
const filters = reactive({
  search: "",
  skills: [],
  experience: [],
});
const limit = 20;

watch(
  () => filters,
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
  if (filters.experience.length > 0) {
    params.append("levels", filters.experience.join(","));
  }
  if (filters.skills.length > 0) {
    params.append("skills", filters.skills.join(","));
  }
  if (filters.search !== "") {
    params.append("search", filters.search);
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
</script>
