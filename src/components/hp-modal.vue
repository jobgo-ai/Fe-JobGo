<template>
  <teleport to="body">
    <div v-if="isOpen">
      <div class="modal__overlay" @click="emits('close')"></div>
      <div class="modal__modal">
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

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.modal-open {
  overflow: hidden;
}
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
  }
}
</style>
