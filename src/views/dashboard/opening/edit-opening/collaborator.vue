<template>
  <div>
    <div class="collaborator" v-if="!isNotOnOpening">
      <div class="collaborator__details">
        <div>{{ collaborator.name }}</div>
        <div class="collaborator__details__role">
          {{ collaborator.email }}
        </div>
      </div>
      <div class="collaborator__actions">
        <hp-dropdown-list
          :label="COLLABORATORS[collaborator.role].label"
          :options="permissionList"
          :isDisabled="
            !permissionList.length > 0 ||
            COLLABORATORS[currentUserRole].hierarchy >=
              COLLABORATORS[collaborator.role].hierarchy
          "
          @handleChange="
            (value) => emits('handleRoleChange', { collaborator, role: value })
          "
        ></hp-dropdown-list>
        <hp-button
          v-if="
            COLLABORATORS[currentUserRole].hierarchy <
            COLLABORATORS[collaborator.role].hierarchy
          "
          icon="trash"
          danger
          @handleClick="emits('handleRemovalRequest', collaborator)"
        ></hp-button>
      </div>
    </div>
    <div v-else class="collaborator">
      <div class="collaborator__details">
        <div>{{ collaborator.name }}</div>
        <div class="collaborator__details__role">
          {{ collaborator.email }}
        </div>
      </div>
      <div>
        <hp-button
          icon="plus"
          @handleClick="emits('handleAddMember', { collaborator })"
        ></hp-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vendor
import { computed } from "vue";

// Components
import HpButton from "@/components/hp-button.vue";
import HpDropdownList from "@/components/hp-dropdown-list.vue";

// Composables
import useOrganization from "@/composables/useOrganization";
import useAuth from "@/composables/useAuth";
import useOpenings from "@/composables/useOpenings";

const props = defineProps({
  collaborator: {
    type: Object,
  },
  isNotOnOpening: {
    type: Boolean,
  },
});

const { user } = useAuth();
const { members } = useOrganization();
const { opening } = useOpenings();

const emits = defineEmits([
  "handleRoleChange",
  "handleRemovalRequest",
  "handleAddMember",
]);

const { COLLABORATORS } = useOrganization();

const currentUserRole = computed(() => {
  const currentUser = opening.value.collaborators.find(
    (m) => m.email === user.value.email
  );
  return currentUser?.role ? currentUser.role : null;
});

const permissionList = computed(() => {
  if (currentUserRole.value === "member") {
    return [];
  }

  if (currentUserRole.value === "owner")
    return Object.keys(COLLABORATORS)
      .filter((k) => k !== "creator")
      .map((key) => ({
        value: COLLABORATORS[key].label,
        description: COLLABORATORS[key].description,
      }));

  if (currentUserRole.value === "creator")
    return Object.keys(COLLABORATORS).map((key) => ({
      value: COLLABORATORS[key].label,
      description: COLLABORATORS[key].description,
    }));
});
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
