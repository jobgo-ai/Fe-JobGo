<template>
  <div class="member">
    <div class="member__details">
      <div>{{ member.name }}</div>
      <div class="member__details__role">{{ member.role }}</div>
    </div>
    <hp-dropdown-list
      :label="member.role"
      :options="permissionList()"
    ></hp-dropdown-list>
  </div>
</template>

<script setup>
// Vendor
import { onMounted } from "vue";

// Components
import HpDropdownList from "@/components/hp-dropdown-list.vue";

// Composables
import useOrganization from "@/composables/useOrganization";

const props = defineProps({
  member: {
    type: Object,
  },
});

const { COLLABORATORS } = useOrganization();

const permissionList = () => {
  return Object.keys(COLLABORATORS).map((key) => ({
    value: key,
    description: COLLABORATORS[key].description,
  }));
};
</script>

<style lang="scss">
.member {
  border: 1px solid var(--color-border);
  border-radius: $border-radius-sm;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  &__details {
    display: flex;
    flex-direction: column;
    &__role {
      text-transform: capitalize;
      margin-top: 4px;
      color: var(--color-text-secondary);
    }
  }
  &__dropdown-target {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    text-transform: capitalize;
    padding-right: 6px;
    &__view {
      margin-right: 4px;
      color: var(--color-text-secondary);
    }
    &--no-dropdown {
      opacity: 0.6;
      cursor: default;
    }
  }
  &__flyout {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-lg;
    position: absolute;
    padding: 8px;
    right: 0;
    z-index: $z-index-1000;
    top: 30px;
    transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    &__items {
      display: flex;
      flex-direction: column;
      &__divider {
        width: 100%;
        border-top: 1px dashed var(--color-border);
        margin-top: 8px;
        margin-bottom: 8px;
      }
      &__item {
        padding: 8px 12px;
      }
    }
    &__options {
      display: flex;
      flex-direction: column;
      width: 100%;
      &__button {
        cursor: pointer;
        padding: 8px;
        border-radius: $border-radius-sm;
        outline: 0;
        background-color: var(--color-background);
        color: var(--color-text);
        border: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        display: flex;
        flex-direction: column;
        &:hover {
          background-color: var(--color-forground-floating);
        }
        &:focus {
          background-color: var(--color-forground-floating);
          outline: none;
        }
        &--disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
      &__option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        color: var(--color-text-primary);
        width: 100%;
        flex-direction: column;
        &__title {
          font-size: 14px;
          font-weight: 500;
          text-transform: capitalize;
        }
        &__desc {
          font-size: 12px;
          color: var(--color-text-secondary);
          min-width: 230px;
          text-align: left;
        }
      }
    }
  }
}
</style>
