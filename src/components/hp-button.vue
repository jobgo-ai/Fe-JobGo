<template>
  <button
    @click="emit('handleClick')"
    class="hp-button"
    :type="type ? type : 'button'"
  >
    <div>{{ label }}</div>
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

<div lang="scss" scoped>
.hp-button {
  cursor: pointer;
  padding: 6px 16px;
  font-size: 14px;
  background-color: var(--color-white);
  color: var(--color-text-primary);
  outline: none;
  border: 1px solid rgba(227, 229, 229, 1);
  border-radius: 8px;
  filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
    drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));

  &:active {
    background-color: var(--color-gray-background);
    box-shadow: 0px 4px 8px rgba(33, 44, 51, 0.02),
      0px 0px 1px rgba(33, 44, 51, 0.02);
  }
}
</div>
