<template>
  <textarea
    :name="name"
    :placeholder="props.label"
    :value="modelValue"
    v-on:input="modelValue = $event.target.value"
    :rows="rows"
  ></textarea>
</template>

<script setup>
const props = defineProps({
  label: String,
  modelValue: String,
  name: String,
  type: String,
  rows: Number,
});

import { useField } from "vee-validate";

const { value: modelValue } = useField(props.name);
</script>
