<template>
  <div>
    <div>Createdtime {{ createdTime }}</div>
    <div>createdDate: {{ createdDate }}</div>
    <div>timetaken: {{ timeTaken }}</div>
  </div>
</template>

<script setup>
//Vendor
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { DateTime } from "luxon";

// Hooks
import { useGet } from "@/hooks/useHttp";

const props = defineProps({
  openings: {
    type: Array,
    default: [],
  },
});

const router = useRouter();
const route = useRoute();
const interview = ref({});

onMounted(async () => {
  const getInterview = useGet(`interviews/${route.params.interviewRef}`);
  await getInterview.get();
  interview.value = getInterview.data.value.interview;
});

const createdDate = computed(() => {
  const startTime = DateTime.fromISO(interview.value.started).toLocaleString(
    DateTime.DATE_MED
  );
  return startTime;
});

const createdTime = computed(() => {
  const startTime = DateTime.fromISO(interview.value.started).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  return startTime;
});

const timeTaken = computed(() => {
  return DateTime.fromISO(interview.value.terminated)
    .diff(DateTime.fromISO(interview.value.started), "minutes")
    .toFormat("m");
});

const handleArchiveInterview = async () => {
  const deleteInterview = useDelete(`interviews/${interview.value.token}`);
  await deleteInterview.remove();
  isInterviewArchiveConfirmOpen.value = false;
  router.push(`/candidates/${route.params.candidateRef}`);
};
</script>
