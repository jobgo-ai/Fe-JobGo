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
  name: {
    type: String,
    default: "cog",
  },
  size: {
    default: 20,
    type: Number,
  },
  color: {
    type: Number,
  },
});

import { computed, defineAsyncComponent } from "vue";

const iconMap = {
  cog: defineAsyncComponent(() => import("../assets/icons/cog.svg?component")),
};

const svg = computed(() => {
  return iconMap[props.name];
});
</script>

<style lang="scss">
.hp-icon {
  fill: currentColor;
}
</style>
