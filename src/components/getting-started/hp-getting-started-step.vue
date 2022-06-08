<template>
  <div class="hp-getting-started-step">
    <div
      :class="`hp-getting-started-step__container ${
        completed && 'hp-getting-started-step__container'
      }`"
      @click="handleAccordianClick"
    >
      <div class="hp-getting-started-step__big-o-container">
        <div
          :class="`hp-getting-started-step__big-o ${
            completed && 'hp-getting-started-step__big-o--completed'
          }`"
        >
          <hp-icon v-if="completed" name="check"></hp-icon>
        </div>
      </div>
      <div class="hp-getting-started-step__container__title">{{ title }}</div>
      <hp-icon v-if="!completed" name="chevron-down"></hp-icon>
    </div>
    <transition name="flyout-transition">
      <div v-if="isAccordianOpen" class="hp-getting-started-step__content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";

// Components
import HpIcon from "@/components/hp-icon.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const isAccordianOpen = ref(false);

const handleAccordianClick = () => {
  if (props.completed) {
    return;
  }
  isAccordianOpen.value = !isAccordianOpen.value;
};
</script>

<style lang="scss" scoped>
.hp-getting-started-step {
  margin-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  padding: 16px;
  cursor: pointer;
  &__big-o {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    &--completed {
      color: var(--color-border);
    }
  }
  &--completed {
    cursor: pointer;
  }
  &__content {
    padding-top: 4px;
    margin-left: 32px;
    font-size: 12px;
  }
  &:first-child {
    margin-top: 12px;
  }
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
  &__container {
    display: flex;
    align-items: center;
    &__title {
      margin-right: 12px;
      white-space: nowrap;
    }
  }
  &__big-o-container {
    width: 32px;
  }
}
</style>
