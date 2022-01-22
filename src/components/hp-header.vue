<template>
  <div class="hp-header">
    <div class="hp-header__left">
      <router-link class="hp-header__logo" to="/openings"><Logo /></router-link>
      <hp-breadcrumbs />
    </div>
    <div class="hp-header__dropdown-container" v-if="user">
      <div
        :class="dropdownClasses"
        @click="isAccountMenuOpen = !isAccountMenuOpen"
      >
        <div class="hp-header__dropdown-target__info">
          <hp-avatar
            class="hp-header__dropdown-target__info__avatar"
            size="sm"
          />
          {{ user.first_name }} {{ user.last_name }}
          <hp-icon
            class="hp-header__dropdown-target__info__icon"
            name="chevron-up"
            :size="14"
          />
        </div>
      </div>
      <transition name="hp-header__dropdown-animation">
        <div
          v-if="isAccountMenuOpen"
          class="hp-header__dropdown"
          ref="dropdownTarget"
        >
          <div class="hp-header__dropdown__info">
            <hp-avatar class="hp-header__dropdown__info__avatar" />
            <div class="hp-header__dropdown__info__name">
              {{ user.first_name }} {{ user.last_name }}
              <div class="hp-header__dropdown__info__email">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="hp-header__dropdown__options">
            <div class="hp-header__dropdown__options__option">
              <hp-icon
                name="cog"
                class="hp-header__dropdown__options__option__icon"
              />
              Account Settings
            </div>
            <div class="hp-header__dropdown__options__option">
              <hp-icon
                name="locked"
                class="hp-header__dropdown__options__option__icon"
              />
              Change password
            </div>
          </div>
          <div class="hp-header__dropdown__options">
            <div class="hp-header__dropdown__options__option">
              <hp-icon
                name="moon"
                class="hp-header__dropdown__options__option__icon"
              />
              Dark mode
            </div>
          </div>
          <div class="hp-header__dropdown__options">
            <div class="hp-header__dropdown__options__option">Logout</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
// Vendor
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
// Components
import HpAvatar from "@/components/hp-avatar.vue";
import HpIcon from "@/components/hp-icon.vue";
// Hooks
import useAuth from "@/hooks/useAuth";
// Svg
import Logo from "@/assets/logo.svg";

const { logout } = useAuth();
const router = useRouter();

const dropdownTarget = ref(null);
const isAccountMenuOpen = ref(false);

onClickOutside(dropdownTarget, (event) => {
  if (event.target.className.includes("hp-header__dropdown")) {
    return;
  }
  isAccountMenuOpen.value = false;
});

const user = {
  first_name: "Nick",
  last_name: "Barth",
  email: "nick@hireproof.io",
  organization: { slug: "hireproof", name: "Hireproof" },
};

const handleLogout = () => {
  logout();
  router.push("/login");
};

const dropdownClasses = computed(() => {
  return {
    "hp-header__dropdown-target": true,
    "hp-header__dropdown-target--open": isAccountMenuOpen.value,
  };
});
</script>

<style lang="scss" scoped>
.hp-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  &__logo {
    margin-right: 24px;
    display: flex;
  }
  &__left {
    display: flex;
    align-items: center;
  }
  &__dropdown-container {
    position: relative;
  }
  &__dropdown-target {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    &:hover {
      background-color: var(--color-panel);
      border: 1px solid var(--color-border);
    }
    &__info {
      display: flex;
      align-items: center;
      &__avatar {
        margin-right: 8px;
      }
      &__icon {
        margin-left: 4px;
        transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }
    }
    &--open {
      background-color: var(--color-panel);
      border: 1px solid var(--color-border);
      .hp-header__dropdown-target__info__icon {
        transform: rotate(180deg);
      }
    }
  }
  &__dropdown {
    z-index: 100;
    background-color: var(--color-accent-forground);
    position: absolute;
    top: calc(100% + 8px);
    left: 100%;
    width: 256px;
    transform: translateX(-100%);
    display: flex;
    flex-direction: column;
    box-shadow: 0px 16px 24px rgba(33, 44, 51, 0.06),
      0px 2px 6px rgba(33, 44, 51, 0.04), 0px 0px 1px rgba(33, 44, 51, 0.04);
    border-radius: 12px;
    &__options {
      padding: 8px;
      border-bottom: 1px dashed var(--color-border);
      &:last-child {
        border-bottom: none;
      }
      &__option {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        &:hover {
          background-color: var(--color-forground-floating);
        }
        &__icon {
          margin-right: 8px;
          color: var(--color-text-secondary);
        }
      }
    }

    &__info {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px dashed var(--color-border);
      &__avatar {
        margin-left: 12px;
        margin-right: 12px;
      }
      &__name {
        padding: 12px 0;
        display: flex;
        flex-direction: column;
      }
      &__email {
        color: var(--color-text-secondary);
        font-weight: 400;
      }
    }
  }
}

.hp-header__dropdown-animation-item {
  transform: translateX(-100%) translateY(0);
}
.hp-header__dropdown-animation-enter-active,
.hp-header__dropdown-animation-leave-active {
  transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
.hp-header__dropdown-animation-enter-from,
.hp-header__dropdown-animation-leave-to {
  opacity: 0;
  transform: translateX(-100%) translateY(-10px);
}
</style>
