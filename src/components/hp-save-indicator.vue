<template>
  <div class="hp-save-indicator">
    <transition name="hp-save-indicator-transition" mode="out-in">
      <hp-spinner v-if="showLoading"></hp-spinner>
      <div v-else><hp-icon size="16" name="check-circle"></hp-icon></div>
    </transition>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpIcon from "@/components/hp-icon.vue";

const startTime = ref(null);

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const showLoading = ref(false);

watch(
  () => props.isLoading,
  () => {
    if (props.isLoading) {
      showLoading.value = true;
      startTime.value = Date.now();
    } else {
      if (Date.now() - startTime.value > 300) {
        showLoading.value = false;
      } else {
        setTimeout(() => {
          showLoading.value = false;
        }, 300 - (Date.now() - startTime.value));
      }
    }
  }
);
</script>

<style lang="scss">
.hp-save-indicator {
  height: 32px;
  display: flex;
  padding: 6px;
  border: $border;
  border-radius: $border-radius-sm;
  align-items: center;
}
</style>
