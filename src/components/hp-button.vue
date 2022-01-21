<template>
  <div class="hp-button" :class="containerClasses">
    <button
      @click="emit('handleClick')"
      class="hp-button__button"
      :class="buttonClasses"
      :type="type ? type : 'button'"
      :disabled="isDisabled"
    >
      <hp-icon
        :class="iconClasses"
        v-if="icon"
        :name="icon"
        :size="14"
      ></hp-icon>
      <div>{{ label }}</div>
      <hp-spinner
        class="hp-button__button__spinner"
        v-if="isLoading"
        :size="14"
      ></hp-spinner>
    </button>
    <button :class="addonClasses" v-if="hasDropdown">
      <hp-icon :name="dropdownIcon" :size="14" />
    </button>
  </div>
</template>

<script setup>
//Vendor
import { computed } from "vue";
// Components
import HpIcon from "@/components/hp-icon.vue";
import HpSpinner from "@/components/hp-spinner.vue";
const props = defineProps({
  label: {
    type: String,
  },
  icon: {
    type: String,
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
  hasDropdown: {
    type: Boolean,
    default: false,
  },
  dropdownIcon: {
    type: String,
    default: "chevron-down",
  },
});

const containerClasses = computed(() => {
  return {
    "hp-button": true,
    "hp-button--primary": props.primary,
    "hp-button--dropdown": props.hasDropdown,
  };
});

const buttonClasses = computed(() => {
  return {
    "hp-button__button": true,
    "hp-button__button--disabled": props.isDisabled,
    "hp-button__button--dropdown": props.hasDropdown,
    "hp-button__button--button-icon": props.icon && !props.label,
  };
});

const addonClasses = computed(() => {
  return {
    "hp-button__button": true,
    "hp-button__button--addon": props.hasDropdown,
  };
});

const iconClasses = computed(() => {
  return {
    "hp-button__button__icon": true,
    "hp-button__button__icon--solo": !props.label,
  };
});

const emit = defineEmits(["handleClick"]);
</script>

<div lang="scss" scoped>
.hp-button {
  display: flex;

  // Button primary
  &--primary > .hp-button__button {
    color: var(--color-accent-forground);
    background-color: var(--color-accent-background);
    border-color: var(--color-accent-background);
    &--disabled {
      border-color: var(--color-border);
      background-color: var(--color-border);
    }
    &--addon {
      color: var(--color-accent-forground);
      opacity: 0.88;
    }
    &:active:not([disabled]),
    &:hover:not([disabled]) {
      background-color: var(--color-accent-background);
      box-shadow: 0px 4px 8px rgba(33, 44, 51, 0.02),
        0px 0px 1px rgba(33, 44, 51, 0.02);
    }

    &:active:not([disabled]) {
      border-color: var(--color-accent-background);
    }
    &:focus:not([disabled]) {
      outline: var(--color-focus) solid 4px;
      border-color: var(--color-accent-background);
      filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
        drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));
    }
  }

  &--primary > .hp-button__button__icon--solo {
    background-color: red;
  }

  &__button {
    font-family: "Inter", sans-serif;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 6px 16px;
    font-size: 14px;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    transition: border-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67),
      background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
      drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));

    &__spinner {
      margin-left: 8px;
    }

    &__icon {
      color: var(--color-text-secondary);
      margin-right: 6px;
      margin-left: -10px;
      &--solo {
        margin-right: 0;
        margin-left: 0;
        color: var(--color-text-primary);
      }
    }

    &--button-icon {
      padding: 6px;
      color: var(--color-text-primary);
    }

    &--disabled {
      color: var(--color-text-tertiary);
      cursor: not-allowed;
    }

    &--dropdown {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    &--addon {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-left: none;
      padding: 6px;
      color: var(--color-text-secondary);
    }

    &:active:not([disabled]),
    &:hover:not([disabled]) {
      background-color: var(--color-panel);
      box-shadow: 0px 4px 8px rgba(33, 44, 51, 0.02),
        0px 0px 1px rgba(33, 44, 51, 0.02);
    }

    &:active:not([disabled]) {
      border-color: var(--color-border-subtle);
    }
    &:focus:not([disabled]) {
      outline: var(--color-focus) solid 4px;
      border-color: var(--color-border);
      filter: drop-shadow(0px 4px 8px rgba(33, 44, 51, 0.02))
        drop-shadow(0px 0px 1px rgba(33, 44, 51, 0.02));
    }
  }
}
</div>
