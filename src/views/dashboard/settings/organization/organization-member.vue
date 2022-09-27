<template>
  <li class="organization-member">
    <div class="organization-member__name" v-if="member.name">
      {{ member.name }}
      <span class="organization-member__email">{{ member.email }}</span>
    </div>
    <div class="organization-member__name" v-else>{{ member.email }}</div>
    <div class="organization-member__actions">
      <div
        v-if="
          promotionList(member.role).length > 0 && user.email !== member.email
        "
        class="organization-member__dropdown-target"
        @click="isRoleFlyoutOpen = !isRoleFlyoutOpen"
        ref="dropdownTarget"
      >
        <div class="organization-member__dropdown-target">
          {{ member.role }}
        </div>
        <hp-icon
          class="organization-member__dropdown-target__icon"
          name="chevron-down"
        ></hp-icon>

        <transition name="flyout-transition">
          <div v-if="isRoleFlyoutOpen" class="organization-member__flyout">
            <ol class="organization-member__flyout__options">
              <li
                v-for="(role, index) in promotionList(member.role)"
                class="organization-member__flyout__options__option"
                @click="emits('handleRoleChange', { member, role })"
              >
                <button
                  class="organization-member__flyout__options__button"
                  type="button"
                >
                  <div
                    class="organization-member__flyout__options__option__title"
                  >
                    {{ role }}
                  </div>
                  <div
                    class="organization-member__flyout__options__option__desc"
                  >
                    {{ ROLES[role].description }}
                  </div>
                </button>
              </li>
            </ol>
          </div>
        </transition>
      </div>
      <div
        class="
          organization-member__dropdown-target
          organization-member__dropdown-target--no-dropdown
        "
        v-else
      >
        {{ member.role }}
      </div>
      <hp-button
        icon="trash"
        v-if="deletePermission"
        danger
        @handleClick="emits('handleRemovalRequest', member)"
      ></hp-button>
    </div>
  </li>
</template>

<script setup>
// Vendor
import { ref } from "vue";

// Components
import HpButton from "@/components/hp-button.vue";
import HpIcon from "@/components/hp-icon.vue";

// Composables
import usePermissions from "@/composables/usePermissions";
import useAuth from "@/composables/useAuth";
import { onClickOutside } from "@vueuse/core";

const { role, user } = useAuth();
const { ROLES } = usePermissions();

const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
  deletePermission: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["handleRoleChange", "handleRemovalRequest"]);

const dropdownTarget = ref(false);
const isRoleFlyoutOpen = ref(false);

const promotionList = (role) => {
  if (role === "founder" || role === "member") {
    return [];
  }
  const filteredRoles = Object.keys(ROLES)
    .filter((r) => r !== role)
    .filter((r) => ROLES[r].hierarchy >= ROLES[role].hierarchy);
  return filteredRoles;
};

onClickOutside(dropdownTarget, (event) => {
  if (!isRoleFlyoutOpen.value) {
    return;
  }
  isRoleFlyoutOpen.value = false;
});
</script>

<styles lang="scss">
.organization-member {
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
    gap: 12px;
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
    color: var(--color-text-secondary);
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
</styles>
