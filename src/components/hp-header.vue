<template>
  <div class="header">
    <router-link to="/openings"><Logo /></router-link>
    <div v-if="user">
      <hp-popper>
        <div class="header__dropdown-target">
          {{ user.email }} <hp-icon name="chevron-up" />
        </div>
        <template #content>
          <router-link to="/change-password">Change password</router-link>
          <router-link to="/settings">Settings</router-link>
          <div @click="handleLogout">Logout</div>
        </template>
      </hp-popper>
    </div>
  </div>
</template>

<script setup>
// Vendor
import HpPopper from "@/components/hp-popper.vue";
import { useRouter } from "vue-router";
// Components
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
