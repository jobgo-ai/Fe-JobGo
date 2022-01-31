<template>
  <div class="hp-spinner">
    <span
      :class="`hp-spinner__spinner hp-spinner__spinner--${mode}`"
      :style="{ width: `${size}px`, height: `${size}px` }"
    ></span>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 16,
  },
  mode: {
    type: String,
    default: "dark",
  },
});
</script>

<style lang="scss">
.hp-spinner {
  display: flex;
  &__spinner {
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transition: all 0.3s ease-in-out;
    &--dark {
      border: 1px solid var(--color-spinner-track);
      border-top: 1px solid var(--color-spinner-bullet);
    }
    &--light {
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-top: 1px solid rgba(255, 255, 255, 1);
    }
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
