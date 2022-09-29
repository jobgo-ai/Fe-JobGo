<template>
  <div class="hp-member-permission">
    <hp-drawer @close="isModalOpen = false" :isOpen="isModalOpen">
      <div class="hp-member-permission__modal">
        <div class="hp-member-permission__modal__title">Manage permissions</div>
        <ol class="hp-member-permission__modal__list">
          <collaborator
            v-for="collaborator in opening.collaborators"
            :collaborator="collaborator"
            @handleRoleChange="handleRoleChange"
            @handleRemovalRequest="handleRemoveMember"
          >
          </collaborator>
        </ol>
      </div>
    </hp-drawer>
    <p class="hp-member-permission__title">Manage permissions</p>
    <p>
      {{ opening.collaborators.length }} members have access.
      <span class="hp-member-permission__link" @click="isModalOpen = true"
        >Manage permissions</span
      >
    </p>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref } from "vue";

// Components
import HpDrawer from "@/components/hp-drawer.vue";
import Collaborator from "./collaborator.vue";

// Composables
import { usePut, useDelete } from "@/composables/useHttp";
import useOrganization from "@/composables/useOrganization";
import useOpenings from "@/composables/useOpenings";
import useToast from "@/composables/useToast";

const { fetchMembers, COLLABORATORS } = useOrganization();

const { setToast } = useToast();

const isLoading = ref(true);
const isModalOpen = ref(false);

const { opening, fetchOpening } = useOpenings();

onMounted(async () => {
  await fetchMembers();
  isLoading.value = false;
});

const handleRemoveMember = async (payload) => {
  const deleteMember = useDelete(
    `openings/${opening.value.reference}/collaborators/${payload.reference}`
  );
  await deleteMember.remove();
  await fetchOpening(opening.value.reference);
  setToast({
    type: "positive",
    title: "Member removed",
    message: `The member will no longer have access to your organization`,
  });
};

const memberInvited = () => {
  setToast({
    type: "positive",
    title: "Invitation sent",
    message: `They will be able to accept this invitation from their email`,
  });
  isAddMemberModalOpen.value = false;
};

const handleRoleChange = async (payload) => {
  const updateMember = usePut(
    `openings/${opening.value.reference}/collaborators/${payload.collaborator.reference}`
  );

  const newRole = Object.keys(COLLABORATORS).find((key) => {
    return COLLABORATORS[key].label === payload.role;
  });

  const formattedPayload = {
    collaborator: {
      role: newRole,
    },
  };
  await updateMember.put(formattedPayload);
  setToast({
    type: "positive",
    title: "Collaborator permission changed",
  });
  await fetchOpening(opening.value.reference);
  await fetchMembers();
};
</script>

<style lang="scss">
.hp-member-permission {
  margin-bottom: 24px;
  &__title {
    @include text-h5;
    margin: 0;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
    font-weight: 500;
  }
  &__link {
    text-decoration: underline;
    cursor: pointer;
  }
  &__modal {
    padding: 24px;
    &__title {
      @include text-h3;
    }
    &__list {
      display: flex;
      flex-direction: column;
      margin-top: 12px;
    }
  }
}
</style>
