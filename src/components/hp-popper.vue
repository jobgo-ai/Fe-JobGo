<template>
  <Popper v-bind="$attrs">
    <slot />
    <template #content="props">
      <div class="hp-tooltip">
        <slot name="content" v-bind="props" />
      </div>
    </template>
  </Popper>
</template>

<script setup>
import Popper from "vue3-popper";
</script>

<style lang="scss">
.hp-tooltip {
  padding: 12px 12px;
  border-radius: 12px;
  left: 50%;
  top: -50px;
  z-index: 1000;
  transform: translateX(-50%);
  background-color: var(--color-tooltip);
  color: var(--color-accent-forground);
  filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
    drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
