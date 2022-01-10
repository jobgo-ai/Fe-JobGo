<template>
  <div
    class="openings"
    :class="{ 'openings--details-open': isCandidateDetailsOpen }"
  >
    <div class="openings__view">
      <router-view :openings="openings"></router-view>
    </div>
    <div class="openings__candidate-list" v-if="isCandidateDetailsOpen">
      <candidate-list
        :isCandidateDetailsOpen="isCandidateDetailsOpen"
        :candidates="candidates"
        :opening="selectedOpening"
        @updateCandidateList="fetchCandidates"
      />
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
const router = useRouter();
const selectedOpening = ref({});
const openings = ref([]);
const candidates = ref([]);
const isCandidateDetailsOpen = ref(false);
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
  isCandidateDetailsOpen.value = route.params.openingRef;
  // If we have a selected opening, fetch candidates else navigate to openings with first opening
  if (!openings.value[0]) {
    return;
  }
  if (route.params.openingRef) {
    await fetchCandidates();
  }
});

// Watches for route changes to deal with candidate details page
watch(
  () => route.path,
  async () => {
    isCandidateListOpen.value =
      !route.path.includes("compare") && !route.path.includes("edit");
    isCandidateDetailsOpen.value = route.params.openingRef;
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
  }
);
</script>

<style lang="scss" scoped>
.openings {
  display: grid;
  justify-content: center;
  grid-template-columns: var(--content-container);
  transition: 3s ease-in-out;
  &--details-open {
    grid-template-columns: var(--content-container) var(--sidebar-container);
  }
  &__view {
  }
  &__candidate-list {
    background-color: blue;
  }
}
</style>
