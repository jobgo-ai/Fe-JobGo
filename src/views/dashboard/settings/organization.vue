<template>
  <div class="settings">
    <h2 class="settings__title">Settings</h2>
    <p class="settings__subtitle">Manage your personal account settings</p>
    <div class="settings__card">
      <h4 class="settings__card__title">Organization information</h4>
      <p class="settings__card__subtitle">
        Change your personal information and keep it updated
      </p>
      what
      <hp-input
        class="settings__card__input"
        label="Name"
        v-model="orgName"
        standalone
      ></hp-input>
      <hp-button label="Save changes" primary></hp-button>
    </div>
    <div class="settings__card">
      <h4 class="settings__card__title">Invite new member</h4>
      <p class="settings__card__subtitle">
        They will receive an email at the entered address, they will be added to
        the organization
      </p>
      <form>
        <hp-input
          class="settings__card__input"
          name="email"
          label="Add member"
        ></hp-input>
        <hp-button label="Add member" name="email" primary></hp-button>
      </form>
    </div>
    <div class="settings__card">
      <h4 class="settings__card__title">Member information</h4>
      <p class="settings__card__subtitle">Manage your members</p>
      <ol class="settings__card__memberlist">
        <li class="settings__card__member" v-for="member in fakeMembers">
          <div class="settings__card__member__name">{{ member.name }}</div>
          <div class="settings__card__member__actions">
            <div class="settings__card__member__role">
              {{ member.role }}
              <hp-icon name="chevron-down"></hp-icon>
            </div>
            <hp-button danger icon="trash" variant="danger"></hp-button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

// Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpSwitch from "@/components/hp-switch.vue";

// Composables
import { usePut } from "@/composables/useHttp";
import useAuth from "@/composables/useAuth";
import useToast from "@/composables/useToast";

const { user, organization } = useAuth();

const { setToast } = useToast();

const schema = yup.object().shape({
  email: yup.string().email(),
});

const fakeMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "admin",
  },
  {
    id: 1,
    name: "Jane Doe",
    role: "member",
  },
  {
    id: 1,
    name: "John Deer",
    role: "member",
  },
  {
    id: 1,
    name: "Goat Doe",
    role: "member",
  },
];

const handleOrganizationNameChange = async () => {
  const putOrganization = usePut("/organization");
  await putOrganization.put({
    self: {
      name: values.name,
    },
  });
  setToast({
    type: "positive",
    title: "New name, new you!",
    message: "Your name has been successfully changed",
  });
};

const { handleSubmit, meta, resetForm, setFieldError, values } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
  },
});

const orgName = ref(organization.value.name);

const onSubmit = handleSubmit(async (values) => {});
</script>

<styles lang="scss">
.settings {
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
        @include text-h5;
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
