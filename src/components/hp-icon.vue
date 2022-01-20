<template>
  <component
    :is="svg"
    role="img"
    :style="{ height: `${size}px`, width: `${size}px` }"
    class="hp-icon"
  />
</template>

<script setup>
const props = defineProps({
  name: String,
  size: Number,
  color: String,
});

import { computed, defineAsyncComponent } from "vue";

const iconMap = {
  test: defineAsyncComponent(() =>
    import("../assets/icons/test.svg?component")
  ),
};

const svg = computed(() => {
  return iconMap[props.name];
});
</script>

<style lang="scss">
.hp-icon {
  color: red;
  display: inline-block;
  fill: currentColor;
}
</style>
