<template>
  <div @click="handleClick" class="hp-dropzone">
    <slot></slot>
    <input
      @change.prevent="handleChange"
      class="hp-dropzone__hidden-input"
      type="file"
      :multiple="multiple"
      :accept="accept"
      ref="inputRef"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: "*/*",
  },
});

const emits = defineEmits(["change"]);

const inputRef = ref(null);

const handleClick = () => {
  inputRef.value.click();
};

const handleChange = (e) => {
  emits("change", e.target.files);
};
</script>

<style lang="scss" scoped>
.hp-dropzone {
  border: 1px dashed var(--color-border);
  padding: 26px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  border-radius: $border-radius-sm;
  &:hover {
    box-shadow: 0px 4px 8px rgba(33, 44, 51, 0.02),
      0px 0px 1px rgba(33, 44, 51, 0.02);
  }

  &__hidden-input {
    display: none;
  }
}
</style>
