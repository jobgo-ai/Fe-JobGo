<template>
  <div class="header">
    <div class="header__left">
      <router-link class="header__logo" to="/openings"><Logo /></router-link>
      <hp-breadcrumbs />
    </div>
    <div v-if="user">
      <hp-popper show="true">
        <div class="header__dropdown-target">
          {{ user.email }} <hp-icon name="chevron-up" />
        </div>
        <template #content>
          <div class="header__dropdown">
            <hp-avatar />
          </div>
        </template>
      </hp-popper>
    </div>
  </div>
</template>

<script setup>
// Vendor
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import HpPopper from "@/components/hp-popper.vue";
import { useRouter } from "vue-router";
// Components
import HpAvatar from "@/components/hp-avatar.vue";
import HpIcon from "@/components/hp-icon.vue";
// Hooks
import useAuth from "@/hooks/useAuth";
// Svg
import Logo from "@/assets/logo.svg";

const { user, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.header {
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
  &__dropdown-target {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: var(--color-panel);
    border: 1px solid var(--color-border);
    border-radius: 12px;
  }
}
</style>
