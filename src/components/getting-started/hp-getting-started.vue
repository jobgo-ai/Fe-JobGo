<template>
  <div class="hp-getting-started">
    <div
      @click="isDropdownOpen = !isDropdownOpen"
      ref="gettingStartedDropdownTarget"
      class="hp-getting-started__dropdown"
    >
      <div class="hp-getting-started__dropdown__content">
        <div>Getting started {{ ((completedSteps / 7) * 100).toFixed() }}%</div>
        <ol class="hp-getting-started__squares">
          <li
            :class="`hp-getting-started__squares__square ${
              checklist[step] && 'hp-getting-started__squares__square--complete'
            }`"
            v-for="step in stepOrder"
          ></li>
        </ol>
      </div>
      <hp-icon name="chevron-down"></hp-icon>
    </div>
    <transition name="flyout-transition">
      <div v-if="isDropdownOpen" class="hp-getting-started__flyout">
        <ol class="hp-getting-started__flyout__steps">
          <hp-getting-started-step
            title="Create account"
            :completed="checklist['account']"
          >
          </hp-getting-started-step>
          <hp-getting-started-step title="Create opening">
            <div class="hp-getting-started__flyout__step__description">
              Create an opening for your new job router-link
              <hp-button
                class="hp-getting-started__flyout__step__cta"
                label="Create opening"
                primary
                @click="console.log('fuck')"
              ></hp-button>
            </div>
          </hp-getting-started-step>
        </ol>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Vendor
import { ref, onMounted, computed } from "vue";
// Components
import HpIcon from "@/components/hp-icon.vue";
import HpButton from "@/components/hp-button.vue";
import HpGettingStartedStep from "@/components/getting-started/hp-getting-started-step.vue";
// Composables
import { useGettingStarted } from "@/composables/useGettingStarted";

const isDropdownOpen = ref(false);

const stepOrder = [
  "account",
  "opening",
  "template",
  "question",
  "candidate",
  "interviewed",
  "invited",
];

const { checklist, fetchChecklist } = useGettingStarted();

onMounted(async () => {
  await fetchChecklist();
  console.log(checklist);
});

const completedSteps = computed(() => {
  return Object.keys(checklist.value).filter((key) => checklist.value[key])
    .length;
});
</script>

<style lang="scss" scoped>
.hp-getting-started {
  position: relative;
  &__content {
    display: flex;
    margin-right: 12px;
  }
  &__squares {
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 2px;
    &__square {
      background-color: var(--color-border);
      width: 16px;
      height: 8px;
      border-radius: 2px;
      &--complete {
        background-color: var(--color-text-primary);
      }
    }
  }
  &__dropdown {
    font-size: 10px;
    font-weight: 500;
    background-color: var(--color-panel);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-md;
    padding: 8px;
    display: flex;
    align-items: center;
  }
  &__flyout {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-lg;
    position: absolute;
    z-index: $z-index-1000;
    right: 0;
    top: 50px;
    transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    &__step {
      &__description {
        margin-top: 4px;
      }
      &__cta {
        margin-top: 12px;
      }
    }
  }
}
</style>
