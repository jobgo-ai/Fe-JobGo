<template>
  <div class="openings">
    <div class="candidate-list">
      <transition name="fade" mode="in-out">
        <candidate-list
          v-if="isCandidateListOpen"
          :isCandidateDetailsOpen="isCandidateDetailsOpen"
          :candidates="candidates"
          :opening="selectedOpening"
          @updateCandidateList="fetchCandidates"
        />
      </transition>
    </div>
    <div :class="isCandidateDetailsOpen ? 'view--left' : 'view'">
      <router-view v-slot="{ Component, route }">
        <transition :name="routeTransition">
          <component :is="Component" :openings="openings" />
        </transition>
      </router-view>
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
    isCandidateDetailsOpen.value = route.path.includes("/candidates");
  }
);

// Watch and change selected opening
watch(
  () => route.params.openingRef,
  async () => {
    if (route.params.openingRef) {
      isCandidateListOpen.value = true;
      selectedOpening.value = openings.value.find(
        (opening) => opening.reference === route.params.openingRef
      );
      await fetchCandidates();
    } else {
      isCandidateListOpen.value = false;
      if (route.path.includes("openings")) {
        await fetchOpenings();
      }
    }
  },
  { immediate: true }
);

const routeTransition = computed(() => {
  if (isCandidateDetailsOpen.value) {
    return "slide-left";
  }
  return "slide-right";
});
</script>

<style lang="scss" scoped>
.openings {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
}

.view {
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 400px);
}
.view--left {
  display: flex;
  flex-direction: column;
  margin-left: 440px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  transform: translateX(0);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(500px);
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.5s ease;
  transform: translateX(0);
}

.route-enter-from,
.route-leave-to {
  transform: translateX(500px);
  opacity: 0;
}
</style>
