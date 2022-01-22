<template>
  <label class="container">
    <input
      v-bind="$attrs"
      class="input"
      type="checkbox"
      :checked="checked"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <span class="switch"></span>
    <span class="label">{{ label }}</span>
  </label>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});
</script>

<sytle lang="scss">
.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.container {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.switch {
  --switch-container-width: 34px;
  --switch-size: 24px;

  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  width: 36px;
  flex-basis: var(--switch-container-width);
  border-radius: var(--switch-size);
  background-color: var(--color-text-tertiary);
  transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.input:focus + .switch {
  outline: var(--color-focus) solid 4px;
}

.input:active + .switch {
  outline: var(--color-focus) solid 4px;
}

.switch::before {
  content: "";
  position: absolute;
  transition: all 0.15s linear;
  left: 2px;
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
  /* Make the inner circle fully rounded */
  border-radius: 9999px;
  background-color: white;
}

.input:checked + .switch {
  background-color: var(--color-accent-background);
}

.input:checked + .switch::before {
  /* Move the inner circle to the right */
  transform: translateX(
    calc(var(--switch-container-width) - var(--switch-size))
  );
}
</sytle>
