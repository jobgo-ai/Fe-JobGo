<template>
  <Popper :show="true" :arrow="true" v-bind="$attrs">
    <slot />
    <template #content="props">
      <div class="hp-tooltip">
        <div class="hp__tooltip-arrow"></div>
        <slot name="content" v-bind="props" />
      </div>
    </template>
  </Popper>
</template>

<script setup>
import Popper from "vue3-popper";
</script>

<script></script>

<style>
.hp-tooltip {
  position: relative;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: var(--color-tooltip);
  color: var(--color-accent-forground);
  filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
    drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));
  display: flex;
  justify-content: center;
  align-items: center;
}

.hp__tooltip-arrow {
  display: block;
  height: 12px;
  width: 12px;
  background-color: inherit;
  border: inherit;
  position: absolute;
  top: -6px;
  left: calc(50% - 6px);
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  transform: rotate(135deg);
  border-radius: 0 0 0 4px;
}
</style>
