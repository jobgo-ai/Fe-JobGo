<template>
  <div class="hp-spinner">
    <span
      class="hp-spinner__spinner"
      :style="{ width: `${size}px`, height: `${size}px` }"
    ></span>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },
});
</script>

<style lang="scss">
.hp-spinner {
  display: flex;
  &__spinner {
    border: 1px solid rgba(51, 70, 82, 0.4);
    border-top: 1px solid rgba(51, 70, 82, 1);
    border-radius: 50%;
    animation: spin 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) infinite;
    transition: all 0.3s ease-in-out;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
