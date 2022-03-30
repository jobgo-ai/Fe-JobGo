<template>
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
          <hp-button
            :to="`/opening/${opening.reference}/edit`"
            icon="pencil"
            label="Edit opening"
          ></hp-button>
        </div>
      </div>
      <div ref="scrollContainer" class="candidate-list__scroll-container">
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
              {{ opening.templates?.length }}
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
              {{ opening.statistics.totalCandidates }}
            </div>
            Candidates
          </div>
        </div>
        <div class="candidate-list__candidate-list">
          <div class="candidate-list__candidate-list__header">
            <div>Candidates</div>
            <div
              class="candidate-list__candidate-list__dropdown-target"
              @click="isFlyoutOpen = !isFlyoutOpen"
              ref="dropdownTarget"
              v-if="templateList && templateList.length > 1"
            >
              <div
                class="candidate-list__candidate-list__dropdown-target__view"
              >
                View:
              </div>
              <div class="candidate-list__candidate-list__dropdown-target__tag">
                {{ templateLabel }}
              </div>
              <hp-icon
                class="candidate-list__candidate-list__dropdown-target__icon"
                name="chevron-down"
              ></hp-icon>
            </div>
            <transition name="flyout-transition">
              <div v-if="isFlyoutOpen" class="candidate-list__flyout">
                <ol class="candidate-list__flyout__options">
                  <li
                    v-for="(template, index) in templateList"
                    class="candidate-list__flyout__options__option"
                  >
                    <button
                      class="candidate-list__flyout__options__button"
                      @click="handleFilterChange(template)"
                      type="button"
                    >
                      {{ template.label }}
                      <hp-radio
                        name="template"
                        tabindex="-1"
                        :checked="template.value === filters.template"
                      />
                    </button>
                    <div
                      class="candidate-list__flyout__items__divider"
                      v-if="index === templateList.length - 2"
                    ></div>
                  </li>
                </ol>
              </div>
            </transition>
          </div>
          <div class="candidate-list__search">
            <hp-input
              variant="search"
              v-model="search"
              icon="search"
              standalone
              placeholder="Search..."
            />
            <div class="candidate-list__add-candidate">
              <hp-button
                icon="plus"
                dropzone
                @click="isAddCandidateModalOpen = true"
                label="Add candidate"
              ></hp-button>
            </div>
          </div>
          <div v-if="!isCandidateListLoading">
            <ol v-if="candidates.length > 0">
              <hp-candidate-card
                v-for="candidate in candidates"
                :key="candidate.reference"
                :candidate="candidate"
                :isDisabled="isInfiniteLoading"
              ></hp-candidate-card>
            </ol>
            <div class="candidate-list__empty-state" v-else>
              <empty-state class="candidate-list__empty-state__image" />
              <div class="candidate-list__empty-state__text--primary">
                Hello? Is anybody there?
              </div>
              <div class="candidate-list__empty-state__text--secondary">
                Looking a tad empty, try adding a candidate
              </div>
              <hp-button
                @handleClick="isAddCandidateModalOpen = true"
                primary
                label="Add candidate"
              ></hp-button>
            </div>
          </div>
          <hp-spinner
            :size="24"
            class="candidate-list__spinner"
            v-else
          ></hp-spinner>
        </div>
      </div>
    </div>
    <hp-spinner :size="24" class="candidate-list__spinner" v-else></hp-spinner>
  </div>
</template>

<script setup>
//Vendor
import { ref, watch, toRefs, computed } from "vue";
import { useRoute } from "vue-router";
import { onClickOutside, useScroll, useDebounce } from "@vueuse/core";

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
import HpCandidateCard from "@/components/cards/hp-candidate-card.vue";
import EmptyState from "@/assets/abstracts/empty-state.svg";

// Composables
import useCandidates from "@/composables/useCandidates";
import useOpenings from "@/composables/useOpenings";

const props = defineProps({
  isCandidateDetailsOpen: {
    type: String,
    default: null,
  },
});

const search = ref("");
const filters = ref({
  search: useDebounce(search, 300),
  template: "all",
});

const { opening, fetchOpening } = useOpenings();
const limit = 15;

const {
  fetchCandidates,
  isCandidateListLoading,
  candidates,
  templateList,
  fetchMoreCandidates,
  isInfiniteLoading,
} = useCandidates();

const route = useRoute();
const isAddCandidateModalOpen = ref(false);
const isFlyoutOpen = ref(false);
const dropdownTarget = ref(null);

const templateLabel = computed(() => {
  return templateList.value.find(
    (template) => template.value === filters.value.template
  )?.label;
});

const handleFilterChange = (template) => {
  isFlyoutOpen.value = false;
  filters.value.template = template.value;
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

watch(
  () => route.params.openingRef,
  async () => {
    if (!route.params.openingRef) {
      return;
    }
    fetchCandidates();
    fetchOpening(route.params.openingRef);
  },
  { immediate: true }
);

const scrollContainer = ref(null);
const { y, arrivedState } = useScroll(scrollContainer);
const { bottom } = toRefs(arrivedState);
const offset = ref(0);
watch(
  () => bottom.value,
  () => {
    if (!bottom.value) {
      return;
    }
    if (isInfiniteLoading.value) {
      return;
    }
    offset.value = offset.value + limit;
    const url = getUrl();
    fetchMoreCandidates(url);
  }
);

watch(
  () => filters,
  () => {
    offset.value = 0;
    const url = getUrl();
    fetchCandidates(url);
  },
  { deep: true }
);

const getUrl = () => {
  const limit = 20;
  let url = `openings/${route.params.openingRef}/candidates`;
  var params = new URLSearchParams([["limit", limit]]);

  params.append("offset", offset.value);
  if (filters.value.search !== "") {
    params.append("search", filters.value.search);
  }
  if (filters.value.template !== "all") {
    params.append("template", filters.value.template);
  }

  return `${url}?${params.toString()}`;
};
</script>

<style lang="scss" scoped>
.candidate-list {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    align-items: center;
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

    &__stat {
      display: flex;
      align-items: center;
      color: var(--color-text-primary);
      &__number {
        font-weight: 600;
        margin-right: 2px;
      }
      &__icon {
        color: var(--color-text-secondary);
        margin-right: 4px;
      }
    }
  }

  &__empty-state {
    margin-top: 40px;
    margin-bottom: 40px;
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
    &__image {
      height: 180px;
    }
  }

  &__scroll-container {
    max-height: 600px;
    overflow: scroll;
    padding-left: 4px;
    padding-right: 4px;
  }

  &__candidate-list {
    margin-top: 24px;

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
    border-radius: $border-radius-lg;
    position: absolute;
    width: 256px;
    padding: 8px;
    z-index: $z-index-1000;
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
      }
    }
    &__options {
      display: flex;
      flex-direction: column;
      width: 100%;
      &__button {
        cursor: pointer;
        padding: 8px;
        border-radius: $border-radius-sm;
        outline: 0;
        background-color: var(--color-background);
        color: var(--color-text);
        border: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        &:hover {
          background-color: var(--color-forground-floating);
        }
        &:focus {
          background-color: var(--color-forground-floating);
          outline: none;
        }
        &--disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
      &__option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        color: var(--color-text-primary);
        width: 100%;
        flex-direction: column;
      }
    }
  }

  &__add-candidate {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  &__search {
    position: sticky;
    top: 0;
    background: var(--color-panel);
    z-index: $z-index-100;
    margin-bottom: 16px;
    border-bottom: 1px dashed var(--color-border);
  }
}
@media (min-width: $breakpoint-tablet) {
  .candidate-list {
    position: absolute;
    transition: transform 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67),
      right 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transform: translateX(0);
    right: 16px;
    width: 400px;
    min-height: 600px;
    z-index: $z-index-10;
    padding: 20px;
    padding-bottom: 0px;
    background-color: var(--color-panel);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-lg;
    &--left {
      right: 100%;
      transform: translateX(100%);
    }
  }
}
</style>
