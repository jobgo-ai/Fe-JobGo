<template>
  <div>
    <hp-modal
      :isOpen="isAddCandidateModalOpen"
      @close="isAddCandidateModalOpen = false"
    >
      <candidate-modal
        @close="isAddCandidateModalOpen = false"
        :opening="opening"
      />
    </hp-modal>
    <div
      class="candidate-list"
      :class="{ 'candidate-list--left': isCandidateDetailsOpen }"
    >
      <div v-if="opening.statistics">
        <div class="candidate-list__header">
          <hp-abstract-avatar :abstractKey="opening.artwork" />
          <div class="candidate-list__header__button-group">
            <router-link :to="`/opening/${opening.reference}/compare`">
              <hp-button
                class="candidate-list__header__button-group__button"
                label="Compare"
              ></hp-button>
            </router-link>
            <router-link :to="`/opening/${opening.reference}/edit`">
              <hp-button icon="pencil"></hp-button>
            </router-link>
          </div>
        </div>
        <h2 class="candidate-list__opening-title">{{ opening.name }}</h2>
        <p class="candidate-list__opening-description">
          {{ opening.description }}
        </p>
        <div class="candidate-list__stats">
          <div class="candidate-list__stats__stat">
            <hp-icon
              class="candidate-list__stats__stat__icon"
              name="layers"
            ></hp-icon>
            <div class="candidate-list__stats__stat__number">
              {{ opening.statistics.templates }}
            </div>
            Interviews
          </div>
          <div class="candidate-list__stats__stat">
            <hp-icon
              class="candidate-list__stats__stat__icon"
              name="skills"
            ></hp-icon>
            <div class="candidate-list__stats__stat__number">
              {{ opening.statistics.skills.length }}
            </div>
            Skills
          </div>
          <div class="candidate-list__stats__stat">
            <hp-icon
              class="candidate-list__stats__stat__icon"
              name="candidates"
            ></hp-icon>
            <div class="candidate-list__stats__stat__number">
              {{ opening.statistics.candidates }}
            </div>
            Candidates
          </div>
        </div>
        <div class="candidate-list__candidate-list">
          <div>
            <div class="candidate-list__candidate-list__header">
              <div>Candidates</div>
              <div
                class="candidate-list__candidate-list__dropdown-target"
                @click="isFlyoutOpen = !isFlyoutOpen"
                ref="dropdownTarget"
              >
                <div
                  class="candidate-list__candidate-list__dropdown-target__view"
                >
                  View:
                </div>
                <div
                  class="candidate-list__candidate-list__dropdown-target__tag"
                >
                  All interviews
                </div>
                <hp-icon
                  class="candidate-list__candidate-list__dropdown-target__icon"
                  name="chevron-down"
                ></hp-icon>
              </div>
              <transition name="candidate-list__flyout-transition">
                <div v-if="isFlyoutOpen" class="candidate-list__flyout">
                  <ol class="candidate-list__flyout__items">
                    <li
                      class="candidate-list__flyout__li"
                      @click="handleItemClick(index)"
                      v-for="(template, index) in templateList"
                    >
                      <div
                        class="candidate-list__flyout__items__divider"
                        v-if="index === templateList.length - 1"
                      ></div>
                      <div class="candidate-list__flyout__items__item">
                        {{ template.label }}
                        <hp-radio name="template" :checked="template.value" />
                      </div>
                    </li>
                  </ol>
                </div>
              </transition>
            </div>
            <hp-input
              variant="search"
              class="candidate-list__search"
              v-model="search"
              icon="search"
              placeholder="Search..."
            />
            <hp-button
              primary
              icon="plus"
              @click="isAddCandidateModalOpen = true"
              label="Add candidate"
              class="candidate-list__add-candidate"
            ></hp-button>
          </div>
          <div v-if="!isCandidateListLoading">
            <ol v-if="candidateList.length > 0">
              <hp-candidate-card
                v-for="candidate in candidateList"
                :key="candidate.reference"
                :candidate="candidate"
              ></hp-candidate-card>
            </ol>
            <div class="candidate-list__empty-state" v-else>
              <empty-state />
              <div class="candidate-list__empty-state__text--primary">
                Hello? Is anybody there?
              </div>
              <div class="candidate-list__empty-state__text--secondary">
                Looking a tad empty, try adding a candidate
              </div>
              <hp-button primary label="Add candidate"></hp-button>
            </div>
          </div>
          <hp-spinner
            :size="24"
            class="candidate-list__spinner"
            v-else
          ></hp-spinner>
        </div>
      </div>
      <hp-spinner
        :size="24"
        class="candidate-list__spinner"
        v-else
      ></hp-spinner>
    </div>
  </div>
</template>

<script setup>
//Vendor
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useDebounce, onClickOutside } from "@vueuse/core";

// Views
import CandidateModal from "./candidate-modal.vue";

//Components
import HpModal from "@/components/hp-modal.vue";
import HpRadio from "@/components/hp-radio.vue";
import HpAbstractAvatar from "@/components/hp-abstract-avatar.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpCandidateCard from "@/components/hp-candidate-card.vue";
import EmptyState from "@/assets/abstracts/empty-state.svg";

// Hooks
import useCandidates from "@/hooks/useCandidates.js";
import router from "../../../router";

const props = defineProps({
  isCandidateDetailsOpen: {
    type: String,
    default: null,
  },
  opening: {
    type: Object,
    default: {},
  },
});

const { fetchCandidates, isCandidateListLoading, candidates, templateList } =
  useCandidates();

const route = useRoute();
const isAddCandidateModalOpen = ref(false);
const isFlyoutOpen = ref(false);
const dropdownTarget = ref(null);

const handleItemClick = (index) => {
  templateList.value = templateList.value.map((template, i) => {
    if (i === index) {
      template.value = true;
    } else {
      template.value = false;
    }
    return template;
  });
};

onClickOutside(dropdownTarget, (event) => {
  if (!isFlyoutOpen.value) {
    return;
  }
  if (event.target.className.includes("candidate-list__flyout")) {
    return;
  }
  isFlyoutOpen.value = false;
});

const search = ref("");
const debouncedSearch = useDebounce(search, 269);

watch(
  () => route.params.openingRef,
  async () => {
    if (!route.params.openingRef) {
      return;
    }
    await fetchCandidates(route.params.openingRef);
  },
  { immediate: true }
);

const handleArchiveCandidate = async () => {
  await fetchCandidates(route.params.openingRef);
  isCandidateDetailsOpen.value = null;
};

const handleAddCandidate = async (candidateRef) => {
  await fetchCandidates(route.params.openingRef);
  isAddCandidateModalOpen.value = false;
  router.push(`/openings/${route.params.openingRef}?candidate=${candidateRef}`);
};

const candidateList = computed(() => {
  if (debouncedSearch.value) {
    return candidates.value.filter((candidate) => {
      return (
        candidate.name
          .toLowerCase()
          .includes(debouncedSearch.value.toLowerCase()) ||
        candidate.email
          .toLowerCase()
          .includes(debouncedSearch.value.toLowerCase())
      );
    });
  }
  return candidates.value;
});
</script>

<style lang="scss" scoped>
.candidate-list {
  background-color: var(--color-panel);
  border-radius: 16px;
  border: 1px solid var(--color-border-subtle);
  position: absolute;
  transition: transform 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67),
    right 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transform: translateX(0);
  right: 16px;
  width: 400px;
  min-height: 600px;
  z-index: 10;
  padding: 24px;
  &--left {
    right: calc(100% - 16px);
    transform: translateX(100%);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    &__avatar {
      height: 40px;
      width: 40px;
    }
    &__button-group {
      display: flex;
      align-items: center;
      &__button {
        margin-right: 6px;
      }
    }
  }

  &__spinner {
    display: flex;
    margin-top: 80px;
    justify-content: center;
  }

  &__opening-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 4px;
  }

  &__opening-description {
    color: var(--color-text-secondary);
  }

  &__stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--color-border);
    margin-top: 16px;
    padding-bottom: 24px;
    margin-bottom: 24px;

    &__stat {
      display: flex;
      align-items: center;
      color: var(--color-text-primary);
      &__number {
        font-weight: 400;
        margin-right: 2px;
      }
      &__icon {
        color: var(--color-text-secondary);
        margin-right: 4px;
      }
    }
  }
  &__empty-state {
    margin-top: 80px;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__text--secondary {
      margin-bottom: 16px;
    }
    &__text--primary {
      color: var(--color-text-primary);
      font-weight: 500;
      margin-bottom: 2px;
    }
  }

  &__candidate-list {
    max-height: 500px;
    overflow: scroll;

    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      position: relative;
    }
    &__dropdown-target {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      &__view {
        margin-right: 4px;
        color: var(--color-text-secondary);
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__flyout {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    position: absolute;
    width: 256px;
    padding: 8px;
    z-index: 1000;
    right: 0;
    top: 30px;
    transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    &__items {
      display: flex;
      flex-direction: column;
      &__divider {
        width: 100%;
        border-top: 1px dashed var(--color-border);
        margin-top: 8px;
        margin-bottom: 8px;
      }
      &__item {
        padding: 8px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        &:hover {
          background-color: var(--color-forground-floating);
        }
      }
    }
  }

  &__add-candidate {
    width: 100%;
  }

  .candidate-list__flyout-transition {
    transform: translateY(0);
  }
  .candidate-list__flyout-transition-enter-active,
  .candidate-list__flyout-transition-leave-active {
    transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  }
  .candidate-list__flyout-transition-enter-from,
  .candidate-list__flyout-transition-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
