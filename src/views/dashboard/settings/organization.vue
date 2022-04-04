<template>
  <div>
    <div class="settings" v-if="!isLoading">
      <hp-modal :isOpen="isAddMemberModalOpen">
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
                isDisabled
                danger
                icon="trash"
                variant="danger"
              ></hp-button>
            </div>
          </li>
        </ol>
        <div v-if="user.organization.role === `owner`">
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
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

// Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpModal from "@/components/hp-modal.vue";
import HpSpinner from "@/components/hp-spinner.vue";

// Composables
import { usePost, useGet } from "@/composables/useHttp";
import useAuth from "@/composables/useAuth";
import useToast from "@/composables/useToast";

const { organization, user } = useAuth();
const isAddMemberModalOpen = ref(false);
const isSendingInvite = ref(false);
const isLoading = ref(true);
const members = ref([]);

const { setToast } = useToast();

const schema = yup.object().shape({
  email: yup.string().email(),
});

onMounted(async () => {
  const getOrganization = useGet(
    `organizations/${organization.value.slug}/users`
  );
  await getOrganization.get();
  members.value = getOrganization.data.value.users;
  isLoading.value = false;
});

const { handleSubmit, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
  },
});

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
</script>

<styles lang="scss">
.settings {
  &__modal {
    padding: 24px;
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
