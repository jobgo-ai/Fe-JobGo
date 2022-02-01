<template>
  <div class="hp-multi-select">
    <hp-dropdown label="All skills">
      <template v-slot:dropdown>
        <div class="hp-multi-select__flyout__search">
          <hp-input variant="search" icon="search" placeholder="Search..." />
        </div>
        <ul class="hp-multi-select__flyout__options">
          <li
            class="hp-multi-select__flyout__options__option"
            v-for="option in options"
            @click="handleChangeEmit(option)"
          >
            {{ option }}
            <hp-checkbox :checked="modelValue.includes(option)" />
          </li>
        </ul>
      </template>
    </hp-dropdown>
    <transition name="fade">
      <div v-if="errorMessage" class="">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { computed } from "vue";
import HpDropdown from "@/components/hp-dropdown.vue";
import HpCheckbox from "@/components/hp-checkbox.vue";
import HpInput from "@/components/form/hp-input.vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  placeholder: {
    type: String,
  },
  options: {
    type: [Array, Function],
    default: () => [],
    required: true,
  },
  modelValue: {
    default: [],
  },
  name: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  selectedMessage: {
    type: String,
    default: null,
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  maxItemsSelected: {
    type: Number,
  },
});

const {
  value: inputValue,
  errorMessage,
  handleChange,
  handleInput,
} = useField(props.name, undefined, {
  initialValue: props.modelValue,
  validateOnValueUpdate: false,
});

// const handleMultipleLabels = (item) => {
//   const items = Object.keys(item).map((key) => item[key].label);
//   return items.join(", ");
// };

const validationListeners = computed(() => {
  if (!errorMessage.value) {
    return {
      blur: handleChange,
      change: handleChange,
      input: handleInput,
    };
  }

  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange,
  };
});

const handleChangeEmit = (change) => {
  let newValue = [...props.modelValue];
  if (newValue.includes(change)) {
    newValue = newValue.filter((item) => item !== change);
  } else {
    newValue.push(change);
  }
  emits("update:modelValue", newValue);
};
</script>

<style lang="scss">
.hp-multi-select {
  width: 100%;
  display: flex;
  &__flyout {
    border-radius: $border-radius-md;
    background-color: var(--color-background);
    padding: 0;
    &__search {
      min-width: 256px;
      padding: 8px 8px 0px 8px;
      border-bottom: 1px dashed var(--color-border);
    }
    &__options {
      padding: 8px;
      &__option {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border-radius: $border-radius-sm;
        &:hover {
          background-color: var(--color-forground-floating);
        }
      }
    }
  }
}
</style>
