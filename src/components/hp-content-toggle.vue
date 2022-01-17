<template>
  <div class="hp-content-toggle">
    <div
      class="hp-content-toggle__background"
      :style="{
        ...styles,
      }"
    ></div>
    <div
      v-for="(item, index) in props.options"
      @click="emits('update:modelValue', item)"
      :class="`hp-content-toggle__option hp-content-toggle__option--${index}`"
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
import { useElementBounding } from "@vueuse/core";

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
@import "@/styles/variables.scss";

.hp-content-toggle {
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  background-color: gray;
  z-index: 2;
  padding: 8px;
  &__background {
    border-radius: $border-radius;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    height: 80%;
    position: absolute;
    background-color: white;
    transition: 0.25s all ease-in;
  }
}
</styles>
