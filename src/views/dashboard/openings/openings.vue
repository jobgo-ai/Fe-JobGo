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
    <div :class="`view`">
      <transition class="candidate-details" name="slide-left">
        <candidate-details
          v-if="isCandidateDetailsOpen"
          :isCandidateDetailsOpen="isCandidateDetailsOpen"
        ></candidate-details>
      </transition>
      <transition
        :class="`openingslist ${!isCandidateListOpen && 'openingslist--empty'}`"
        name="slide-right"
      >
        <openings-list
          v-if="!isCandidateDetailsOpen"
          :openings="openings"
        ></openings-list>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useGet } from "@/hooks/useHttp.js";

import CandidateList from "@/views/dashboard/openings/candidate-list.vue";
import CandidateDetails from "@/views/dashboard/openings/candidate-details.vue";
import OpeningsList from "@/views/dashboard/openings/openings-list.vue";

const route = useRoute();
const selectedOpening = ref({});
const openings = ref([]);
const candidates = ref([]);
const isCandidateDetailsOpen = ref(route.query.candidate);
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
  isCandidateDetailsOpen.value = route.query.candidate;
});

// Watches for route changes to deal with candidate details page
watch(
  () => route.query.candidate,
  async () => {
    isCandidateDetailsOpen.value = route.query.candidate;
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
</script>

<style lang="scss" scoped>
.openings {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.view {
  display: flex;
  position: relative;
}
.candidate-details {
  position: absolute;
  left: 440px;
  width: calc(100% - 440px);
}

.openingslist {
  position: absolute;
  left: 0;
  width: calc(100% - 440px);
  transition: all 0.25s ease-out;
}

.openingslist--empty {
  left: 50%;
  transform: translateX(-50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
  transform: translateX(0);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(500px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.25s ease-out;
  transition-delay: 0.15s;
}

.slide-left-leave-active {
  transition: all 0.25s ease-in;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(400px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.25s ease-out;
  transition-delay: 0.15s;
}

.slide-right-leave-active {
  transition: all 0.25s ease-in;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-400px);
  opacity: 0;
}
</style>
