<template>
  <label class="hp-switch">
    <input
      v-bind="$attrs"
      class="hp-switch__input"
      type="checkbox"
      v-model="modelValue"
      @change="handleChange"
    />
    <span class="hp-switch__switch"></span>
    <span class="label">{{ label }}</span>
  </label>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue", "input"]);

const handleChange = (e) => {
  emits("update:modelValue", e.target.checked);
  emits("input");
};
</script>

<style lang="scss">
.hp-switch__input {
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

.hp-switch {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.hp-switch__switch {
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

.hp-switch__input:focus + .hp-switch__switch {
  outline: var(--color-focus) solid 4px;
}

.hp-switch__input:active + .hp-switch__switch {
  outline: var(--color-focus) solid 4px;
}

.hp-switch__switch::before {
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

.hp-switch__input:checked + .hp-switch__switch {
  background-color: var(--color-accent-background);
}

.hp-switch__input:checked + .hp-switch__switch::before {
  /* Move the inner circle to the right */
  transform: translateX(
    calc(var(--switch-container-width) - var(--switch-size))
  );
}
</style>
