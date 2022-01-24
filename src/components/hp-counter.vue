<template>
  <div class="hp-counter">
    <label v-if="label" class="hp-counter__label" :htmlFor="name"
      >{{ label }}
    </label>
    <div :class="containerClasses">
      <div class="hp-counter__container">
        <button
          class="hp-counter__container__button"
          type="button"
          @click="handleCountDecrement"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
        >
          <hp-icon
            class="hp-counter__container__icon"
            :size="14"
            name="minus"
          ></hp-icon>
        </button>
        <div class="hp-counter__container__count">
          <input
            type="number"
            v-model="modelValue"
            maxlength="2"
            class="hp-counter__container__input"
            @focus="isInputFocused = true"
            @blur="isInputFocused = false"
          />
        </div>
        <button
          type="button"
          class="hp-counter__container__button"
          @click="handleCountIncrement"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
        >
          <hp-icon
            class="hp-counter__container__icon"
            :size="14"
            name="plus"
          ></hp-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import HpIcon from "@/components/hp-icon.vue";

// Vendor
import { ref, computed } from "vue";
import { useField } from "vee-validate";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
  },
  name: {
    type: String,
  },
  isDisabled: {
    type: String,
  },
});

const isInputFocused = ref(false);

const { errorMessage, value: modelValue } = useField(props.name);

const handleCountIncrement = () => {
  modelValue.value++;
  emits("update:modelValue", modelValue.value);
};
const handleCountDecrement = () => {
  modelValue.value--;
  emits("update:modelValue", modelValue.value);
};

const containerClasses = computed(() => {
  return {
    "hp-counter__input-container": true,
    "hp-counter__input-container--disabled": props.isDisabled,
    "hp-counter__input-container--focused": isInputFocused.value,
  };
});
</script>

<styles lang="scss">
.hp-counter {
  display: inline-flex;
  flex-direction: column;
  &__input-container {
    border-radius: 8px;
    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
      .hp-counter__container {
        pointer-events: none;
      }
    }
    &--focused {
      outline: 4px solid var(--color-focus);
      .hp-counter__container {
        border: 1px solid var(--color-accent-background);
      }
    }
  }
  &__label {
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--color-text-secondary);
  }
  &__container {
    display: inline-flex;
    align-items: center;
    background-color: var(--color-accent-forground);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 8px;
    &:hover {
      border: 1px solid var(--color-accent-background);
    }
    &__input {
      width: 100%;
      max-width: 20px;
      border: none;
      outline: none;
      &:focus,
      &:active {
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    &__count {
      display: flex;
      justify-content: center;
      margin-right: 8px;
      margin-left: 8px;
      color: var(--color-text-primary);
    }
    &__button {
      position: relative;
      height: 20px;
      width: 20px;
      background-color: var(--color-accent-forground);
      border: 1px solid var(--color-border);
      cursor: pointer;
      border-radius: 6px;
      box-shadow: 0px 4px 8px rgba(33, 44, 51, 0.02),
        0px 0px 1px rgba(33, 44, 51, 0.02);
      &:hover {
        border: 1px solid var(--color-accent-background);
      }
      &:active {
        background-color: var(--color-panel);
      }
    }
    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      color: var(--color-text-primary);
    }
  }
}
</styles>
