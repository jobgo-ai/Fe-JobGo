<template>
  <component
    :is="icon"
    role="img"
    :style="{ height: `${size}px`, width: `${size}px` }"
    class="hp-icon"
  />
</template>

<script setup>
import { onMounted, shallowRef } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "cog",
  },
  size: {
    default: 20,
    type: Number,
  },
});

const icon = shallowRef(null);

onMounted(async () => {
  const comp = await import(`../assets/icons/${props.name}.svg?component`);
  icon.value = comp.default || null;
});
</script>

<style lang="scss"></style>
