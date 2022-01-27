<template>
  <div :style="{ height: `${size}px`, width: `${size}px` }">
    <component
      :is="icon"
      role="img"
      :alt="icon"
      :style="{ height: `${size}px`, width: `${size}px` }"
      class="hp-icon"
    />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";

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

const icon = computed(() => {
  return defineAsyncComponent(() =>
    import(/* @vite-ignore */ `../assets/icons/${props.name}.svg`)
  );
});
</script>

<style lang="scss"></style>
