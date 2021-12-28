<template>
  <div v-if="isOpen" @click="$emit('close')">
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
