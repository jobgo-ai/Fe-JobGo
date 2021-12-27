<template>
  <input
    class="input"
    :type="type ? type : 'text'"
    :placeholder="props.label"
    :value="props.modelValue"
    v-on:input="updateValue($event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  label: String,
  modelValue: String,
  type: String,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
  emit("update:modelValue", value);
}
</script>
