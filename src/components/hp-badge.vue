<template>
  <div :class="`hp-badge hp-badge--${props.type} hp-badge--${props.size}`">
    <hp-icon
      v-if="icon"
      :size="14"
      class="hp-badge__icon"
      :name="icon"
    ></hp-icon>
    {{ props.content }}
  </div>
</template>

<script setup>
import HpIcon from "@/components/hp-icon.vue";
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  content: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
});
</script>

<style lang="scss">
.hp-badge {
  display: inline-flex;
  background-color: inherit;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  padding: 2px 6px;
  font-size: 12px;
  line-height: 16px;
  border-radius: 6px;
  height: 20px;
  &__icon {
    margin-right: 6px;
  }
  &:hover {
    background-color: var(--color-border-subtle);
  }

  &--positive {
    background-color: var(--color-background-positive);
    color: var(--color-forground-positive);
    border: 1px solid var(--color-border-positive);
    &:hover {
      background-color: var(--color-background-positive);
    }
  }

  &--negative {
    background-color: var(--color-background-negative);
    color: var(--color-forground-negative);
    border: 1px solid var(--color-border-negative);
    &:hover {
      background-color: var(--color-background-negative);
    }
  }

  &--sm {
    font-size: 10px;
    padding: 2px 4px;
  }
}
</style>
