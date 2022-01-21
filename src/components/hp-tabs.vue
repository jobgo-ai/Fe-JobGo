<template>
  <div class="hp-tabs">
    <div
      class="hp-tabs__background"
      :style="{
        ...styles,
      }"
    ></div>
    <div
      v-for="(item, index) in props.options"
      @click="emits('update:modelValue', item)"
      :class="`hp-tabs__option hp-tabs__option--${index} ${
        index === correctIndex && 'hp-tabs__option--selected'
      }`"
      :ref="
        (el) => {
          if (el) optionRefs[index] = el;
        }
      "
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => {
      return ["True", "False"];
    },
  },
});

const optionRefs = ref([]);

const correctIndex = computed(() => {
  return props.options.findIndex((item) => {
    return item.toLowerCase() === props.modelValue.toLowerCase();
  });
});

const styles = computed(() => {
  const correctIndex = props.options.findIndex((item) => {
    return item.toLowerCase() === props.modelValue.toLowerCase();
  });
  const width = optionRefs.value[correctIndex]?.clientWidth;
  const left = optionRefs.value[correctIndex]?.offsetLeft;
  return {
    width: `${width}px`,
    left: `${left}px`,
  };
});
</script>

<styles lang="scss" scoped>
.hp-tabs {
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  background-color: var(--color-border);
  z-index: 2;
  padding: 6px;
  border-radius: 12px;
  &__option {
    cursor: pointer;
    transition: color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    padding: 6px 16px;
    color: var(--color-text-secondary);
    &--selected {
      color: var(--color-text-primary);
    }
  }
  &__background {
    border-radius: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    height: 32px;
    position: absolute;
    background-color: white;
    transition: 0.15s all cubic-bezier(0.17, 0.67, 0.83, 0.67);
  }
}
</styles>
