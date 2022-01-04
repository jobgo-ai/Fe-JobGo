<template>
  <div class="hp-drawer" v-if="isOpen"><slot></slot></div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["close"]);
</script>

<style lang="scss">
.hp-drawer {
  background-color: blue;
}
</style>
