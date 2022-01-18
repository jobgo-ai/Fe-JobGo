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
        <div v-if="!isCandidateDetailsOpen" class="opening-list">
          <h2>Openings</h2>
          <p>Manage your openings or quickly create new ones</p>
          <hp-content-toggle
            :options="['Active', 'Archived']"
            v-model="state"
          />
          <ol class="opening-list__grid">
            <div class="opening-list__grid-item" @click="handleNewOpening">
              New opening
            </div>
            <li
              class="opening-list__grid-item"
              @click="router.push(`/openings/${opening.reference}`)"
              :key="opening.reference"
              v-for="opening in openings"
            >
              <div class="opening-list__grid-item__content">
                <h4>{{ opening.name }}</h4>
                <p>{{ opening.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useGet, usePost } from "@/hooks/useHttp.js";

// Views
import CandidateList from "@/views/dashboard/openings/candidate-list.vue";
import CandidateDetails from "@/views/dashboard/openings/candidate-details.vue";

// Components
import HpContentToggle from "@/components/hp-content-toggle.vue";

const route = useRoute();
const router = useRouter();
const selectedOpening = ref({});
const openings = ref([]);
const candidates = ref([]);
const isCandidateDetailsOpen = ref(route.query.candidate);
const isCandidateListOpen = ref(route.params.openingRef);

const state = ref("active");

const fetchCandidates = async () => {
  const getCandidates = useGet(
    `openings/${route.params.openingRef}/candidates`
  );
  await getCandidates.get();
  candidates.value = getCandidates.data.value?.candidates;
};

const fetchOpenings = async () => {
  const url = `openings?state=${state.value.toLowerCase()}`;
  const getOpenings = useGet(url);
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
    } else if (!route.params.openingRef) {
      isCandidateListOpen.value = false;
      await fetchOpenings();
    }
  },
  { immediate: true }
);

// Handle add opening
const postOpening = usePost("openings");
const handleNewOpening = async () => {
  await postOpening.post({
    opening: {
      name: `Opening #${openings.value.length + 1}`,
      description: "",
      templates: [],
    },
  });
  if (postOpening.data.value) {
    router.push(`/opening/${postOpening.data.value.opening.reference}/edit`);
  }
};

watch(state, (newFilters) => {
  fetchOpenings();
});
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
  height: calc(100vh - 40px);
  z-index: 0;
}
.candidate-details {
  position: absolute;
  left: 440px;
  height: 100%;
  overflow: scroll;
}

.candidate-details::-webkit-scrollbar {
  display: none;
}

.openingslist {
  position: absolute;
  overflow: hidden;
  width: calc(100% - 440px);
  top: 0;
  left: 0;
  bottom: 0;
  transition: all 0.35s linear;
}

.openingslist--empty {
  left: 50%;
  transform: translateX(-50%);
}

.opening-list {
  &__grid {
    position: relative;
    overflow: scroll;
    height: 100%;
    display: grid;
    grid-gap: 40px;
    grid-template-columns: repeat(auto-fill, 264px);
    align-content: baseline;
    padding-bottom: 75px;
  }
  &__grid-item {
    height: 264px;
    background-color: blue;
    padding: 80px;
  }
}

.opening-list__grid::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s linear;
  transform: translateX(0);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(500px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.35s linear;
}

.slide-left-leave-active {
  transition: all 0.35s linear;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(900px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.35s linear;
}

.slide-right-leave-active {
  transition: all 0.35s linear;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-900px);
  opacity: 0;
}
</style>
