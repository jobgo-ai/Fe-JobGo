<template>
  <div class="openings">
    <candidate-list
      :isCandidateDetailsOpen="isCandidateDetailsOpen"
      :candidates="candidates"
    />
    <div class="view" :class="{ 'view--left': isCandidateDetailsOpen }">
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
const router = useRouter();

const openings = ref([]);
const candidates = ref([]);
const isCandidateDetailsOpen = ref(false);

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
  isCandidateDetailsOpen.value = route.path.includes("/candidates");
  if (!route.params.openingRef) {
    router.push(`/openings/${getRoles.data.value.roles[0].reference}`);
  } else {
    await fetchCandidates();
  }
});

watch(
  () => route.path,
  async () => {
    isCandidateDetailsOpen.value = route.path.includes("/candidates");
  }
);

watch(
  () => route.params.openingRef,
  async () => {
    if (route.params.openingRef) {
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
