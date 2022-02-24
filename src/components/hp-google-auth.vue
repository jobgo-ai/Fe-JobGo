<template>
  <div v-if="!isLoading">
    <div
      id="g_id_onload"
      :data-client_id="gapiKey"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="handleLogin"
      data-auto_select="false"
    ></div>

    <div
      class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="outline"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
      data-width="288"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  isSignIn: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["handleSignIn"]);
const isLoading = ref(true);
const handleLogin = (res) => {
  emits("handleSignIn", res);
};

const gapiKey = import.meta.env.VITE_GAPI_KEY;

onMounted(() => {
  window.handleLogin = handleLogin;
  isLoading.value = false;
});
</script>

<style></style>
