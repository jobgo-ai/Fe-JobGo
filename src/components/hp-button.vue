<template>
  <button
    @click="emit('handleClick')"
    class="input"
    :type="type ? type : 'submit'"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: String,
  to: String,
});

const emit = defineEmits(["handleClick"]);
</script>
