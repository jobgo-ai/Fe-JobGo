<template>
  <div class="relative">
    <Multiselect
      :searchable="searchable"
      :mode="mode"
      :name="name"
      :disabled="isDisabled"
      v-model="inputValue"
      :options="options"
      :id="name"
      :max="max"
      :multipleLabel="handleMultipleLabels"
      @change="handleChangeEmit"
      v-on="validationListeners"
      :canDeselect="canDeselect"
      :canClear="canDeselect"
      :placeholder="placeholder"
      :closeOnSelect="closeOnSelect"
      :minChars="1"
      :delay="delay"
      :resolveOnLoad="true"
    >
      <template v-if="selectedMessage" v-slot:multiplelabel="{ values }">
        <div class="">{{ values.length }} {{ selectedMessage }}</div>
      </template>
    </Multiselect>
    <transition name="fade">
      <div v-if="errorMessage" class="">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import Multiselect from "@vueform/multiselect";
import { useField } from "vee-validate";
import { computed } from "vue";

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
    default: null,
  },
  name: {
    type: String,
  },
  delay: {
    type: Number,
    default: -1,
  },
  mode: {
    type: String,
    default: "single",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  canDeselect: {
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
  max: {
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

const handleMultipleLabels = (item) => {
  const items = Object.keys(item).map((key) => item[key].label);
  return items.join(", ");
};

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
  emits("update:modelValue", change);
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
