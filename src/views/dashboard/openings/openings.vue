<template>
  <div class="openings">
    <candidate-list
      v-if="isCandidateListOpen"
      :isCandidateDetailsOpen="isCandidateDetailsOpen"
      :candidates="candidates"
      :opening="selectedOpening"
    />
    <div class="view" :class="{ 'view--left': isCandidateDetailsOpen }">
      <router-view :openings="openings"></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
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
const isCandidateListOpen = ref(
  !route.path.includes("compare") && !route.path.includes("edit")
);

const fetchCandidates = async () => {
  const getCandidates = useGet(`roles/${route.params.openingRef}/candidates`);
  await getCandidates.get();
  candidates.value = getCandidates.data.value?.candidates;
};

onMounted(async () => {
  const getRoles = useGet("roles");
  getRoles.get();
  await getRoles.get();
  openings.value = getRoles.data.value.roles;
  // Checks for openingRef in route params
  if (route.params.openingRef) {
    // Sets selected opening to openingRef in route params
    selectedOpening.value = openings.value.find(
      (opening) => opening.reference === route.params.openingRef
    );
  } else {
    // Takes first opening
    selectedOpening.value = openings.value[0];
  }
  // Checks to see if candidate detail page is open
  isCandidateDetailsOpen.value = route.path.includes("/candidates");
  // If we have a selected opening, fetch candidates else navigate to openings with first opening
  if (!route.params.openingRef) {
    router.push(`/openings/${getRoles.data.value.roles[0].reference}`);
  } else {
    await fetchCandidates();
  }
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
    }
  }
);
</script>

<style lang="scss" scoped>
.openings {
  display: flex;
  width: 100%;
}

.view {
  display: flex;
  &--left {
    margin-left: 240px;
  }
}
</style>
