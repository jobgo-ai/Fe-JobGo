<template>
  <div v-if="isOpen">
    <slot></slot>
  </div>
</template>

<script setup>
defineEmits(["close"]);
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>
