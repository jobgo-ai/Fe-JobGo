<template>
  <div class="header">
    <div>Hireproof</div>
    <div v-if="user">
      <hp-popper>
        <div>{{ user.email }}</div>
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
// Hooks
import useAuth from "@/hooks/useAuth";

const { user, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  background-color: red;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
