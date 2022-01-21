<template>
  <div class="hp-button" :class="containerClasses">
    <button
      @click="emit('handleClick')"
      class="hp-button__button"
      :class="buttonClasses"
      :type="type ? type : 'button'"
      :disabled="isDisabled"
    >
      <div>{{ label }}</div>
      <hp-spinner
        class="hp-button__spinner"
        v-if="isLoading"
        :size="14"
      ></hp-spinner>
    </button>
    <button v-if="dropdown">Hello</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import HpSpinner from "@/components/hp-spinner.vue";
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "button",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  dropdown: {
    type: Boolean,
    default: false,
  },
});

const containerClasses = computed(() => {
  return {
    "hp-button": true,
    "hp-button--primary": props.primary,
    "hp-button--dropdown": props.dropdown,
  };
});

const buttonClasses = computed(() => {
  return {
    "hp-button__button": true,
    "hp-button__button--disabled": props.isDisabled,
  };
});

const emit = defineEmits(["handleClick"]);
</script>

<div lang="scss" scoped>
.hp-button {
  display: flex;

  &__button {
    font-family: "Inter", sans-serif;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 6px 16px;
    font-size: 14px;
    background-color: var(--color-white);
    color: var(--color-text-primary);
    outline: none;
    border: 1px solid rgba(227, 229, 229, 1);
    border-radius: 8px;
    transition: border-color 0.15s linear, background-color 0.15s linear;
    filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
      drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));

    &__spinner {
      margin-left: 8px;
    }

    &--disabled {
      color: var(--color-text-tertiery);
      cursor: not-allowed;
    }

    &:active:not([disabled]),
    &:hover:not([disabled]) {
      background-color: var(--color-gray-background);
      box-shadow: 0px 4px 8px rgba(33, 44, 51, 0.02),
        0px 0px 1px rgba(33, 44, 51, 0.02);
    }

    &:active:not([disabled]) {
      border-color: var(--color-border-subtle);
    }
    &:focus:not([disabled]) {
      outline: #f2f4f5 solid 4px;
      border-color: var(--color-border);
      filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
        drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));
    }
  }
}
</div>
