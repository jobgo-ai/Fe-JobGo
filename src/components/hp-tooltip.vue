<template>
  <div class="hp-tooltip__container">
    <div @mouseleave="isHovered = false" @mouseenter="isHovered = true">
      <slot />
    </div>
    <div v-if="isHovered" class="hp-tooltip">
      <div class="hp__tooltip-arrow"></div>
      <div v-if="isHovered" class="hp-tooltip__content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isHovered = ref(false);
</script>

<style lang="scss">
.hp-tooltip {
  position: absolute;
  padding: 12px 12px;
  border-radius: 12px;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  background-color: var(--color-tooltip);
  color: var(--color-accent-forground);
  filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
    drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    position: relative;
    display: inline-flex;
  }
  &__content {
    white-space: nowrap;
  }
}

.hp__tooltip-arrow {
  display: block;
  height: 12px;
  width: 12px;
  background-color: inherit;
  border: inherit;
  position: absolute;
  bottom: -6px;
  left: calc(50% - 6px);
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  transform: rotate(315deg);
  border-radius: 0 0 0 4px;
}
</style>
