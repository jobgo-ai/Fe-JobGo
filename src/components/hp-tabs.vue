<template>
  <div class="hp-tabs">
    <button
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
    </button>
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

// const styles = computed(() => {
//   const correctIndex = props.options.findIndex((item) => {
//     return item.toLowerCase() === props.modelValue.toLowerCase();
//   });
//   const width = optionRefs.value[correctIndex]?.clientWidth;
//   const left = optionRefs.value[correctIndex]?.offsetLeft;
//   return {
//     width: `${width}px`,
//     left: `${left}px`,
//   };
// });
</script>

<styles lang="scss" scoped>
.hp-tabs {
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  background-color: var(--color-border);
  z-index: 2;
  padding: 4px;
  border-radius: 12px;
  transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  &__option {
    background-color: transparent;
    cursor: pointer;
    border: none;
    line-height: 20px;
    transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    padding: 6px 16px;
    color: var(--color-text-secondary);
    border-radius: 12px;

    &--selected {
      color: var(--color-text-primary);
      background-color: white;
    }

    &:focus {
      outline: var(--color-outline) solid 4px;
    }
  }
  // &__background {
  //   border-radius: 12px;
  //   top: 4px;
  //   z-index: -1;
  //   height: 32px;
  //   position: absolute;
  //   background-color: var(--color-accent-forground);
  //   transition: 0.15s all cubic-bezier(0.17, 0.67, 0.83, 0.67);
  //   box-shadow: 0px 4px 8px rgba(33, 44, 51, 0.02),
  //     0px 0px 1px rgba(33, 44, 51, 0.02);
  // }
}
</styles>