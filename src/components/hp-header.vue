<template>
  <div class="hp-header">
    <div class="hp-header__left">
      <router-link class="hp-header__logo" to="/openings"><Logo /></router-link>
      <hp-breadcrumbs />
    </div>
    <div class="hp-header__right">
      <div class="hp-header__save-container">
        <hp-button
          v-if="hasHeaderSaveButton"
          primary
          :isLoading="isContextFormSaving"
          :isDisabled="!isContextFormDirty"
          @handleClick="handleContextFormSave"
          label="Save"
        >
          <template #dropdown>
            <div class="hp-header__save-container__dropdown-container">
              <div class="hp-header__save-container__dropdown-container__item">
                <hp-icon
                  class="
                    hp-header__save-container__dropdown-container__item__icon
                  "
                  name="floppy"
                ></hp-icon
                >Save
              </div>
              <div class="hp-header__save-container__dropdown-container__item">
                <hp-icon
                  class="
                    hp-header__save-container__dropdown-container__item__icon
                  "
                  name="template"
                ></hp-icon
                >Save as template
              </div>
            </div>
          </template>
        </hp-button>
      </div>
      <div class="hp-header__dropdown-container" v-if="user">
        <div
          :class="dropdownClasses"
          @click="isAccountMenuOpen = !isAccountMenuOpen"
        >
          <div class="hp-header__dropdown-target__info">
            <hp-avatar
              :class="`hp-header__dropdown-target__info__avatar
            ${
              hasHeaderSaveButton &&
              'hp-header__dropdown-target__info__avatar--save-button'
            }`"
              size="sm"
              :user="user"
            />
            <div class="hp-header__dropdown__deets" v-if="!hasHeaderSaveButton">
              {{ user.firstName }} {{ user.lastName }}
            </div>
          </div>
        </div>
        <transition name="hp-header__dropdown-transition">
          <div
            v-if="isAccountMenuOpen"
            class="hp-header__dropdown"
            ref="dropdownTarget"
          >
            <div class="hp-header__dropdown__info">
              <hp-avatar
                :user="user"
                class="hp-header__dropdown__info__avatar"
              />
              <div class="hp-header__dropdown__info__name">
                <div>{{ user.firstName }} {{ user.lastName }}</div>
                <div class="hp-header__dropdown__info__email">
                  {{ user.email }}
                </div>
              </div>
            </div>
            <div class="hp-header__dropdown__options">
              <router-link
                to="/settings"
                tag="div"
                class="hp-header__dropdown__options__option"
                @click="isAccountMenuOpen = false"
              >
                <hp-icon
                  name="cog"
                  class="hp-header__dropdown__options__option__icon"
                />
                Account Settings
              </router-link>
              <router-link
                @click="isAccountMenuOpen = false"
                tag="div"
                to="/change-password"
                class="hp-header__dropdown__options__option"
              >
                <hp-icon
                  name="locked"
                  class="hp-header__dropdown__options__option__icon"
                />
                Change password
              </router-link>
            </div>
            <div class="hp-header__dropdown__options">
              <div
                @click.prevent="handleDarkModeToggle"
                class="
                  hp-header__dropdown__options__option
                  hp-header__dropdown__options__option--toggle
                "
              >
                <div class="hp-header__dropdown__options__dark-mode">
                  <hp-icon
                    name="moon"
                    class="hp-header__dropdown__options__option__icon"
                  />
                  Dark mode
                </div>
                <hp-switch v-model:checked="darkmode" />
              </div>
            </div>
            <div class="hp-header__dropdown__options">
              <div class="hp-header__dropdown__options__option">Logout</div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vendor
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
// Components
import HpAvatar from "@/components/hp-avatar.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpSwitch from "@/components/hp-switch.vue";
import HpButton from "@/components/hp-button.vue";
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
// Hooks
import useAuth from "@/hooks/useAuth";
import useContextSave from "@/hooks/useContextSave";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
// Svg
import Logo from "@/assets/logo.svg";

const { logout } = useAuth();
const router = useRouter();

const darkmode = ref(localStorage.getItem("theme") === "dark");
const dropdownTarget = ref(null);
const isAccountMenuOpen = ref(false);

onClickOutside(dropdownTarget, (event) => {
  if (!isAccountMenuOpen.value) {
    return;
  }
  console.log(event.target.className);
  if (event.target.className.includes("hp-header__dropdown")) {
    return;
  }
  console.log("im here");
  isAccountMenuOpen.value = false;
});

const { handleContextFormSave, isContextFormDirty, isContextFormSaving } =
  useContextSave();

const { user } = useAuth();

const handleLogout = () => {
  logout();
  router.push("/login");
};

const handleDarkModeToggle = () => {
  darkmode.value = !darkmode.value;
  if (darkmode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};

const dropdownClasses = computed(() => {
  return {
    "hp-header__dropdown-target": true,
    "hp-header__dropdown-target--open": isAccountMenuOpen.value,
  };
});

const { hasHeaderSaveButton } = useBreadcrumbs();
</script>

<style lang="scss" scoped>
.hp-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  &__save-container {
    padding-right: 16px;
    border-right: $border;
    margin-right: 8px;
    &__dropdown-container {
      &__item {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: $border-radius-sm;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          background-color: var(--color-forground-floating);
        }
        &__icon {
          margin-right: 6px;
        }
      }
    }
  }
  &__logo {
    margin-right: 24px;
    display: flex;
  }
  &__right {
    display: flex;
    align-items: center;
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
    border-radius: $border-radius-lg;
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
        &--save-button {
          margin-right: 0;
        }
      }
    }
    &--open {
      background-color: var(--color-panel);
      border: 1px solid var(--color-border);
    }
  }
  &__dropdown {
    z-index: 100;
    background-color: var(--color-background);
    position: absolute;
    top: calc(100% + 8px);
    left: 100%;
    width: 256px;
    transform: translateX(-100%);
    display: flex;
    flex-direction: column;
    box-shadow: 0px 16px 24px rgba(33, 44, 51, 0.06),
      0px 2px 6px rgba(33, 44, 51, 0.04), 0px 0px 1px rgba(33, 44, 51, 0.04);
    border-radius: $border-radius-lg;
    border: 1px solid var(--color-border-subtle);

    &__personal-deets {
      display: flex;
    }
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
        border-radius: $border-radius-sm;
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
        &--toggle {
          justify-content: space-between;
        }
      }
      &__dark-mode {
        display: flex;
        align-items: center;
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
        font-weight: 300;
      }
    }
  }
}

.hp-header__dropdown-transition-item {
  transform: translateX(-100%) translateY(0);
}
.hp-header__dropdown-transition-enter-active,
.hp-header__dropdown-transition-leave-active {
  transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
.hp-header__dropdown-transition-enter-from,
.hp-header__dropdown-transition-leave-to {
  opacity: 0;
  transform: translateX(-100%) translateY(-10px);
}
</style>
