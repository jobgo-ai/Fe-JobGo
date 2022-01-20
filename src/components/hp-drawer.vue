<template>
  <teleport to="body">
    <div v-if="isOpen">
      <div class="drawer__overlay" @click="emits('close')"></div>
      <div class="drawer__drawer">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { watch } from "vue";
const emits = defineEmits(["close"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// Corresponds to scroll disabling while overlay is open, found in app scss
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.drawer-open {
  overflow: hidden;
}
.drawer {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 33%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
  }
}
</style>
