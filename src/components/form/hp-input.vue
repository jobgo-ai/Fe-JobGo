<template>
  <div>
    <label :htmlFor="name">{{ label }} </label>
    <input
      class="input"
      :name="name"
      :type="type ? type : 'text'"
      :placeholder="props.label"
      :value="modelValue"
      v-on:input="modelValue = $event.target.value"
    />
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  label: String,
  modelValue: String,
  name: String,
  type: String,
});

const { errorMessage, value: modelValue } = useField(props.name);
</script>
