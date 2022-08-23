<template>
  <div class="hp-google-auth" v-if="!isLoading">
    <div
      id="g_id_onload"
      :data-client_id="gapiKey"
      data-context="signup"
      data-ux_mode="popup"
      data-callback="handleLogin"
      data-auto_select="false"
    ></div>

    <div
      class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="outline"
      data-text="signup_with"
      data-size="large"
      data-logo_alignment="left"
      data-max-width="10000"
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

<style lang="scss">
.hp-google-auth {
  max-width: 100%;
}
</style>
