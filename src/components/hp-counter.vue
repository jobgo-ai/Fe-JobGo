<template>
  <div class="hp-counter">
    <div class="hp-counter__count">
      <span class="hp-counter__count-number">{{ modelValue }}</span>
    </div>
    <button type="button" @click="handleCountIncrement">Increase</button>
    <button type="button" @click="handleCountDecrement">Decrease</button>
  </div>
</template>

<script setup>
// Vendor
import { useField } from "vee-validate";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
  },
});

console.log(props.name);

const { errorMessage, value: modelValue } = useField(props.name);

const handleCountIncrement = () => {
  modelValue.value++;
  emits("update:modelValue", modelValue.value);
};
const handleCountDecrement = () => {
  modelValue.value--;
  emits("update:modelValue", modelValue.value);
};
</script>
