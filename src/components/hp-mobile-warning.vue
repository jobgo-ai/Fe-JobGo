<template>
  <div class="hp-mobile-warning">
    <p class="hp-mobile-warning__text">
      We are working hard on mobile, should be ready soon
    </p>
    <empty-state></empty-state>
  </div>
</template>

<script setup>
import EmptyState from "@/assets/abstracts/empty-state.svg";
</script>

<style lang="scss">
.hp-mobile-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  z-index: 1000;
  padding: 24px;

  $breakpoint-tablet: 768px;
  @media (min-width: $breakpoint-tablet) {
    display: none;
  }

  &__text {
    font-weight: 400;
    margin-bottom: 8px;
    text-align: center;
  }
}
</style>
