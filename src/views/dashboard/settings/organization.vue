<template>
  <div>
    <div class="settings" v-if="!isLoading">
      <hp-modal
        :isOpen="isConfirmMemberRemovalOpen"
        @close="isConfirmMemberRemovalOpen = false"
      >
        <div class="settings__modal">
          <h4 class="settings__card__title">Remove member</h4>
          <p class="settings__card__subtitle">
            This member will lose access to your organizations interviews,
            results, and templates
          </p>
          <div class="settings__modal__actions">
            <hp-button
              @handleClick="isConfirmMemberRemovalOpen = false"
              label="Cancel"
            ></hp-button>
            <hp-button
              class="settings__modal__button"
              destructive
              :isLoading="isRemovingMember"
              label="Remove member"
              @handleClick="handleRemoveMember"
            ></hp-button>
          </div></div
      ></hp-modal>
      <hp-modal
        :isOpen="isAddMemberModalOpen"
        @close="isAddMemberModalOpen = false"
      >
        <div class="settings__modal">
          <h4 class="settings__card__title">Invite member</h4>
          <p class="settings__card__subtitle">
            This member will have access to your organizations interviews,
            results, and templates
          </p>
          <form @submit="onSubmit">
            <div class="">
              <hp-input
                placeholder="Enter candidate email..."
                label="Email"
                name="email"
              ></hp-input>
            </div>
            <hp-button
              primary
              type="submit"
              :isLoading="isSendingInvite"
              :isDisabled="!meta.valid || isSendingInvite"
              label="Send invite"
            ></hp-button>
          </form></div
      ></hp-modal>
      <h2 class="settings__title">
        {{ organization.name }}
      </h2>
      <p class="settings__subtitle">Manage your organization</p>
      <div class="settings__card">
        <h4 class="settings__card__title">Member information</h4>
        <p class="settings__card__subtitle">Manage your members</p>
        <ol class="settings__card__memberlist">
          <li class="settings__card__member" v-for="member in members">
            <div class="settings__card__member__name">
              {{ member.name }}
              <span class="settings__card__member__email">{{
                member.email
              }}</span>
            </div>
            <div class="settings__card__member__actions">
              <div class="settings__card__member__role">
                {{ member.role }}
              </div>
              <hp-button
                icon="trash"
                v-if="canDeleteMember(member)"
                danger
                @handleClick="handleRemovalRequest(member)"
              ></hp-button>
            </div>
          </li>
        </ol>
        <div v-if="isOwner">
          <h4 class="settings__card__title">Invite new member</h4>
          <p class="settings__card__subtitle">
            They will receive an email at the entered address, they will be
            added to the organization
          </p>
          <hp-button
            @handleClick="isAddMemberModalOpen = true"
            label="Add member"
            name="email"
            primary
          ></hp-button>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="settings__spinner">
      <hp-spinner :content="true" size="32" />
    </div>
  </div>
</template>

<script setup>
// Vendor
import { ref, onMounted, computed } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

// Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpModal from "@/components/hp-modal.vue";
import HpSpinner from "@/components/hp-spinner.vue";

// Composables
import { usePost, useGet, useDelete } from "@/composables/useHttp";
import useAuth from "@/composables/useAuth";
import useToast from "@/composables/useToast";

const { organization, user } = useAuth();
const isAddMemberModalOpen = ref(false);
const memberToRemove = ref(null);
const isRemovingMember = ref(false);
const isConfirmMemberRemovalOpen = ref(false);
const isSendingInvite = ref(false);
const isLoading = ref(true);
const members = ref([]);

const { setToast } = useToast();

const schema = yup.object().shape({
  email: yup.string().email(),
});

const isOwner = computed(() => {
  return user.value.organization?.role === "owner";
});

const fetchOrgs = async () => {
  const getOrganization = useGet(
    `organizations/${organization.value.slug}/users`
  );
  await getOrganization.get();
  members.value = getOrganization.data.value.users;
  isLoading.value = false;
};

onMounted(() => {
  fetchOrgs();
});

const { handleSubmit, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
  },
});

const handleRemoveMember = async () => {
  isRemovingMember.value = true;
  const deleteMember = useDelete(`users/${memberToRemove.value.reference}`);
  await deleteMember.remove();
  await fetchOrgs();
  isRemovingMember.value = false;
  isConfirmMemberRemovalOpen.value = false;
  setToast({
    type: "positive",
    title: "Member removed",
    message: `The member will no longer have access to your organization`,
  });
  memberToRemove.value = null;
};

const handleRemovalRequest = (member) => {
  memberToRemove.value = member;
  isConfirmMemberRemovalOpen.value = true;
};

const onSubmit = handleSubmit(async (values) => {
  isSendingInvite.value = true;
  const postInvitation = usePost("invitations");
  await postInvitation.post({
    invitation: {
      email: values.email,
    },
  });

  setToast({
    type: "positive",
    title: "Invitation sent",
    message: `They will be able to accept this invitation from their email`,
  });
  isSendingInvite.value = false;
  isAddMemberModalOpen.value = false;
});

const canDeleteMember = (member) => {
  const isAdmin = user.value.organization?.role === "admin";
  if (isAdmin) {
    return true;
  }

  const isOwner = user.value.organization?.role === "owner";
  const notCurrentMember = user.value.reference !== member.reference;
  return isOwner && notCurrentMember;
};
</script>

<styles lang="scss">
.settings {
  &__modal {
    padding: 24px;
    &__button {
      margin-left: 12px;
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
    }
  }
  &__spinner {
    margin: auto;
  }
  &__card {
    &__add-member {
      display: flex;
      align-items: baseline;
    }
    &__memberlist {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }
    &__member {
      padding: 12px;
      border: 1px solid var(--color-border);
      border-radius: $border-radius-sm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      &__actions {
        display: flex;
        align-items: center;
      }
      &__name {
        display: flex;
        flex-direction: column;
        @include text-h5;
      }
      &__email {
        color: var(--color-text-secondary);
        @include text-h6;
      }
      &__role {
        margin-right: 12px;
        display: flex;
        align-items: center;
        text-transform: capitalize;
        color: var(--color-text-secondary);
      }
    }
  }
}
</styles>
