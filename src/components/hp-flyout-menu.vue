<template>
  <div class="hp-flyout-menu">
    <div
      class="hp-flyout-menu__item"
      @click="item.action"
      v-for="item in items"
    >
      <hp-icon
        class="hp-flyout-menu__item__icon"
        v-if="item.icon"
        :name="item.icon"
      ></hp-icon>
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup>
import HpIcon from "@/components/hp-icon.vue";
const props = defineProps({
  items: {
    type: Array,
  },
  defaults: {
    type: Array,
  },
});
</script>

<style lang="scss">
.hp-flyout-menu {
  background-color: var(--color-background);
  padding: 8px;
  &__item {
    display: flex;
    align-items: center;
    border-radius: $border-radius-sm;
    padding: 6px;
    cursor: pointer;
    &__icon {
      margin-right: 6px;
    }
    &:hover {
      background-color: var(--color-forground-floating);
    }
  }
}
</style>
