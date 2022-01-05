<template>
  <div>Details</div>
  <div v-if="details.name">{{ details.name }}</div>
</template>

<script setup>
const props = defineProps({
  openings: {
    type: Array,
    default: [],
  },
});

import { useGet } from "@/hooks/useHttp";
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const details = ref({});

const fetchDetails = async () => {
  const getDetails = useGet(`candidates/${route.params.candidateRef}`);
  await getDetails.get();
  details.value = getDetails.data.value.candidate.openings[0];
};

onMounted(async () => {
  await fetchDetails();
});

watch(
  () => route.params.candidateRef,
  async () => {
    if (route.params.candidateRef) {
      await fetchDetails();
    }
  }
);
</script>
