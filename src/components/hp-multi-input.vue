<template>
  <div class="">
    <draggable
      v-model="internalValue"
      tag="transition-group"
      item-key="id"
      handle=".handle"
      @change="handleDragChange"
    >
      <template #item="{ element, index }">
        <div class="handle">
          <div>
            <input
              :disabled="isDisabled"
              :value="element.text"
              :name="`guidelines-${index}`"
              :placeholder="placeholder"
              @input="handleInput($event, index)"
              @keydown="handleKeydown(index)"
              :id="index"
              :maxlength="maxChars"
            />
            <div v-if="maxChars">{{ element.text.length }}/{{ maxChars }}</div>
          </div>
          <hp-button tabIndex="-1"> </hp-button>
          <hp-button label="remove item" @handleClick="removeItem(element)">
          </hp-button>
        </div>
      </template>
    </draggable>
    <hp-button
      :isDisabled="maxItems <= internalValue.length"
      @handleClick="handleAddItem"
      label="add guideline"
    ></hp-button>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import HpButton from "@/components/hp-button.vue";

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

const emit = defineEmits(["update:modelValue"]);
const initialValue =
  props.modelValue.length < 1
    ? [{ id: uuidv4(), text: "" }]
    : props.modelValue.map((i) => ({ text: i, id: uuidv4() }));

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

<style>
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
