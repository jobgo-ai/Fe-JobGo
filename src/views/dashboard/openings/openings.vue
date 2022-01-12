<template>
  <div class="openings">
    <div class="candidate-list">
      <candidate-list
        v-if="isCandidateListOpen"
        :isCandidateDetailsOpen="isCandidateDetailsOpen"
        :candidates="candidates"
        :opening="selectedOpening"
        @updateCandidateList="fetchCandidates"
      />
    </div>
    <div :class="isCandidateDetailsOpen ? 'view--left' : 'view'">
      <router-view :openings="openings"></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useGet } from "@/hooks/useHttp.js";

import CandidateList from "@/views/dashboard/openings/candidate-list.vue";

const route = useRoute();
const selectedOpening = ref({});
const openings = ref([]);
const candidates = ref([]);
const isCandidateDetailsOpen = ref(route.path.includes("/candidates"));
const isCandidateListOpen = ref(route.params.openingRef);

const fetchCandidates = async () => {
  const getCandidates = useGet(
    `openings/${route.params.openingRef}/candidates`
  );
  await getCandidates.get();
  candidates.value = getCandidates.data.value?.candidates;
};

const fetchOpenings = async () => {
  const getOpenings = useGet("openings");
  getOpenings.get();
  await getOpenings.get();
  openings.value = getOpenings.data.value.openings;
};

onMounted(async () => {
  await fetchOpenings();
  // Checks for openingRef in route params
  if (route.params.openingRef) {
    // Sets selected opening to openingRef in route params
    selectedOpening.value = openings.value.find(
      (opening) => opening.reference === route.params.openingRef
    );
  }
  // Checks to see if candidate detail page is open
  isCandidateDetailsOpen.value = route.path.includes("/candidates");
});

// Watches for route changes to deal with candidate details page
watch(
  () => route.path,
  async () => {
    isCandidateListOpen.value =
      !route.path.includes("compare") && !route.path.includes("edit");
    isCandidateDetailsOpen.value = route.path.includes("/candidates");
  }
);

// Watch and change selected opening
watch(
  () => route.params.openingRef,
  async () => {
    if (route.params.openingRef) {
      selectedOpening.value = openings.value.find(
        (opening) => opening.reference === route.params.openingRef
      );
      await fetchCandidates();
    } else {
      if (route.path.includes("openings")) {
        await fetchOpenings();
      }
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.openings {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.view {
  display: flex;
  flex-direction: column;
}
.view--left {
  display: flex;
  flex-direction: column;
  margin-left: 440px;
}
</style>
