<template>
  <div class="collaborator">
    <div class="collaborator__details">
      <div>{{ collaborator.name }}</div>
      <div class="collaborator__details__role">
        {{ COLLABORATORS[collaborator.role].label }}
      </div>
    </div>
    <div class="collaborator__actions">
      <hp-dropdown-list
        :label="COLLABORATORS[collaborator.role].label"
        :options="permissionList()"
        :isDisabled="permissionList(collaborator.role).length > 0"
        @handleChange="
          (value) => emits('handleRoleChange', { collaborator, role: value })
        "
      ></hp-dropdown-list>
      <hp-button
        icon="trash"
        danger
        @handleClick="emits('handleRemovalRequest', collaborator)"
      ></hp-button>
    </div>
  </div>
</template>

<script setup>
// Components
import HpButton from "@/components/hp-button.vue";
import HpDropdownList from "@/components/hp-dropdown-list.vue";

// Composables
import useOrganization from "@/composables/useOrganization";

const props = defineProps({
  collaborator: {
    type: Object,
  },
});

const emits = defineEmits(["handleRoleChange", "handleRemovalRequest"]);

const { COLLABORATORS } = useOrganization();

const permissionList = () => {
  return Object.keys(COLLABORATORS).map((key) => ({
    value: COLLABORATORS[key].label,
    description: COLLABORATORS[key].description,
  }));
};
</script>

<style lang="scss">
.collaborator {
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
  &__actions {
    display: flex;
    gap: 6px;
  }
}
</style>
