<template>
  <div class="openings">
    <div class="candidate-list">
      <transition name="fade" mode="in-out" appear>
        <candidate-list
          v-if="isCandidateListOpen"
          :isCandidateDetailsOpen="isCandidateDetailsOpen"
          :opening="selectedOpening"
        />
      </transition>
    </div>
    <div :class="`view`">
      <transition class="candidate-details" name="slide-left">
        <candidate-details
          v-if="isCandidateDetailsOpen"
          :isCandidateDetailsOpen="isCandidateDetailsOpen"
          :opening="selectedOpening"
        ></candidate-details>
      </transition>
      <transition
        :class="`openingslist ${!isCandidateListOpen && 'openingslist--empty'}`"
        name="slide-right"
      >
        <div v-if="!isCandidateDetailsOpen" class="opening-list">
          <h2 class="openings__title">Openings</h2>
          <p class="openings__subtitle">
            Manage your openings or quickly create new ones
          </p>
          <hp-tabs
            class="openings__tabs"
            :options="['active', 'archived']"
            v-model="state"
          />
          <ol v-if="!isOpeningsLoading" class="opening-list__grid">
            <hp-opening-card
              v-if="state === 'active'"
              @click="handleNewOpening"
              :isAddCard="true"
            >
            </hp-opening-card>
            <hp-opening-card
              v-for="opening in openings"
              :isSelected="opening.reference === route.params.openingRef"
              @click="handleOpeningCardClick(opening)"
              :key="opening.reference"
              :opening="opening"
              :isArchived="state === 'Archived'"
            >
            </hp-opening-card>
          </ol>
          <hp-spinner
            class="openingslist__spinner"
            :size="24"
            v-else
          ></hp-spinner>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

// Hooks
import { useGet, usePost } from "@/hooks/useHttp";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

// Views
import CandidateList from "@/views/dashboard/openings/candidate-list.vue";
import CandidateDetails from "@/views/dashboard/openings/candidate-details.vue";

// Components
import HpTabs from "@/components/hp-tabs.vue";
import HpOpeningCard from "@/components/hp-opening-card.vue";
import HpSpinner from "@/components/hp-spinner.vue";

const route = useRoute();
const router = useRouter();
const selectedOpening = ref({});
const openings = ref([]);
const isCandidateDetailsOpen = ref(route.query.candidate);
const isCandidateListOpen = ref(route.params.openingRef);

const isOpeningsLoading = ref(true);
const state = ref("active");

const fetchOpenings = async () => {
  isOpeningsLoading.value = true;
  const url = `openings?state=${state.value.toLowerCase()}`;
  const getOpenings = useGet(url);
  await getOpenings.get();
  openings.value = getOpenings.data.value.openings;
  isOpeningsLoading.value = false;
};

const handleOpeningCardClick = (opening) => {
  if (opening.state === "archived") {
    return;
  }
  if (opening.reference === route.params.openingRef) {
    router.push(`/openings/`);
  } else {
    router.push(`/openings/${opening.reference}`);
  }
};

onMounted(async () => {
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
    if (!route.query.candidate) {
      const { setBreadcrumbs } = useBreadcrumbs();
      setBreadcrumbs([]);
    }
    isCandidateDetailsOpen.value = route.query.candidate;
  }
);

// Watch and change selected opening
watch(
  () => route.params.openingRef,
  async () => {
    if (route.params.openingRef) {
      if (openings.value.length === 0) {
        await fetchOpenings();
      }
      isCandidateListOpen.value = true;
      selectedOpening.value = openings.value.find(
        (opening) => opening.reference === route.params.openingRef
      );
    } else if (!route.params.openingRef) {
      isCandidateListOpen.value = false;
      if (openings.value.length > 0) {
        return;
      } else {
        await fetchOpenings();
      }
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

watch(state, () => {
  fetchOpenings();
});
</script>

<style lang="scss" scoped>
.openings {
  display: flex;
  width: 100%;
  flex-direction: column;
  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin: 0;
    margin-bottom: 4px;
  }
  &__subtitle {
    color: var(--color-text-secondary);
    margin: 0;
    margin-bottom: 16px;
  }
  &__tabs {
    margin-bottom: 24px;
  }
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
  width: 840px;
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
  transform: translateX(0);
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  &__spinner {
    display: flex;
    justify-content: center;
  }
}

.openingslist--empty {
  transform: translateX(25%);
}

.opening-list {
  &__grid {
    position: relative;
    overflow: scroll;
    height: 100%;
    display: grid;
    grid-gap: 26px;
    grid-template-columns: repeat(auto-fill, 264px);
    align-content: baseline;
    padding-bottom: 500px;
  }
  &__grid-item {
    height: 264px;
    background-color: white;
    border: 1px solid grey;
    border-radius: 12px;
    padding: 12px;
  }
}

.opening-list__grid::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transform: translateX(0);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(500px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.slide-left-leave-active {
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(900px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.slide-right-leave-active {
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-900px);
  opacity: 0;
}
</style>
