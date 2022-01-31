<template>
  <div class="hp-flyout">
    <ol class="hp-flyout__items">
      <li
        class="hp-flyout__items__item"
        @click="handleItemChange(index)"
        v-for="(item, index) in items"
      >
        {{ item.label }}
        <hp-radio :name="`item_${index}`" :checked="item.value" />
      </li>
    </ol>
    <ol class="hp-flyout__defaults">
      <li class="hp-flyout__default" v-for="(item, index) in defaults">
        {{ item.label }}
        <hp-radio :name="`d_item_${index}`" :checked="item.value" />
      </li>
    </ol>
  </div>
</template>

<script setup>
import HpRadio from "@/components/hp-radio.vue";
const props = defineProps({
  items: {
    type: Array,
  },
  defaults: {
    type: Array,
  },
});

const handleItemChange = (item) => {
  item.value = !item.value;
};
</script>

<style lang="scss">
.hp-flyout {
  background-color: var(--color-background);
  border-radius: $border-radius-lg;
  box-shadow: 0px 16px 24px rgba(33, 44, 51, 0.06),
    0px 2px 6px rgba(33, 44, 51, 0.04), 0px 0px 1px rgba(33, 44, 51, 0.04);
  max-width: 300px;
  &__items {
    display: flex;
    flex-direction: column;
    padding: 8px;
    &__item {
      display: flex;
      justify-content: space-between;
      height: 36px;
      padding: 12px 8px;
      &:hover {
        background-color: var(--color-floating-forground);
      }
    }
  }
}
</style>
