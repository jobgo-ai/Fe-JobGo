<template>
  <div class="hp-counter">
    <div class="hp-counter__count">
      <span class="hp-counter__count-number">{{ count }}</span>
    </div>
    <button type="button" @click="handleCountIncrement">Increase</button>
    <button type="button" @click="handleCountDecrement">Decrease</button>
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const count = ref(props.modelValue);

const handleCountIncrement = () => {
  count.value++;
  emits("update:modelValue", count.value);
};
const handleCountDecrement = () => {
  count.value--;
  emits("update:modelValue", count.value);
};
</script>
