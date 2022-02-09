<template>
  <div class="hp-multi-input">
    <draggable
      v-model="internalValue"
      tag="transition-group"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      handle=".hp-multi-input__input-container__icon"
      @change="handleDragChange"
    >
      <template #item="{ element, index }">
        <div class="hp-multi-input__input-container">
          <hp-icon
            class="hp-multi-input__input-container__icon"
            name="drag"
          ></hp-icon>
          <input
            class="hp-multi-input__input-container__input"
            :disabled="isDisabled"
            :value="element.text"
            :name="`guidelines-${index}`"
            @input="handleInput($event, index)"
            :id="index"
            :maxlength="maxChars"
          />
          <hp-icon
            class="hp-multi-input__button"
            @click="removeItem(element)"
            name="trash"
            danger
          ></hp-icon>
        </div>
      </template>
    </draggable>
    <hp-button
      :isDisabled="maxItems <= internalValue.length"
      @handleClick="handleAddItem"
      dropzone
      icon="plus"
      label="Add guideline"
    ></hp-button>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import draggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";
import { ref, computed } from "vue";
import HpButton from "@/components/hp-button.vue";
import HpIcon from "@/components/hp-icon.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    required: false,
  },
  maxItems: {
    type: Number,
    default: 5,
  },
  maxChars: {
    type: Number,
    default: 120,
  },
  buttonLabel: {
    type: String,
    default: "Add",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: Boolean,
    default: false,
  },
});

const { errorMessage, value: formValue } = useField(props.name);

const drag = ref(false);

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});

console.log(formValue.value);

const emit = defineEmits(["update:modelValue"]);
const initialValue =
  !formValue.value || formValue.value.length < 1
    ? [{ id: uuidv4(), text: "" }]
    : formValue.value.map((i) => ({ text: i, id: uuidv4() }));

const internalValue = ref(initialValue);

const handleAddItem = () => {
  if (props.maxItems <= internalValue.value.length) {
    return;
  }
  internalValue.value = internalValue.value.concat(
    [],
    [{ id: uuidv4(), text: "" }]
  );
};

const emitChange = (change) => {
  internalValue.value = change;
  emit(
    "update:modelValue",
    change.map((i) => i.text).filter((i) => i)
  );
  formValue.value = internalValue.value.map((i) => i.text);
};

const handleInput = (event, index) => {
  const tempValue = internalValue.value;
  tempValue[index].text = event.target.value;
  emitChange(tempValue);
};

const removeItem = (itemToRemove) => {
  const newArray = internalValue.value.filter(
    (item) => item.id !== itemToRemove.id
  );
  emitChange(newArray);
};

const handleDragChange = () => {
  emitChange(internalValue.value);
};

const handleKeydown = (index) => {
  if (index === internalValue.value.length - 1) {
    handleAddItem();
  }
};
</script>

<style lang="scss">
.hp-multi-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  &__input-container {
    display: flex;
    align-items: center;
    background-color: var(--color-panel);
    border: $border;
    width: 100%;
    padding: 6px;
    border-radius: $border-radius-sm;
    margin-bottom: 6px;

    &__input {
      background-color: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: $border-radius-sm;
      padding: 8px 8px 8px 12px;
      line-height: 36px;
      max-height: 32px;
      flex-grow: 1;
      transition: border-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      color: var(--color-text-primary);
      &--search {
        background-color: var(--color-underground);
        max-height: 32px;
      }
      &::placeholder {
        color: var(--color-text-secondary);
      }
      &:focus:not([disabled]),
      &:active:not([disabled]) {
        outline: 4px solid var(--color-focus);
        border: 1px solid var(--color-accent-background);
      }
    }

    &__icon {
      margin-right: 16px;
      cursor: grab;
    }
  }
  &__input {
    width: 100%;
  }
  &__button {
    margin-left: 12px;
    margin-right: 6px;
    cursor: pointer;
    color: var(--color-forground-negative);
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.15s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
