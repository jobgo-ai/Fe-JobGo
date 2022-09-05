<template>
  <div class="hp-google-auth__container" ref="container">
    <div class="hp-google-auth" ref="googleContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { usePost } from "@/composables/useHttp.js";

const props = defineProps({
  isSignIn: {
    type: Boolean,
    default: false,
  },
});
const googleContainer = ref(null);
const emits = defineEmits(["handleSignIn"]);
const handleLogin = async (res) => {
  const user = await usePost("sso").post({
    sso: {
      provider: "google",
      token: res.credential,
    },
  });

  emits("handleSignIn", res);
};

const gapiKey = import.meta.env.VITE_GAPI_KEY;

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: gapiKey,
    callback: handleLogin,
  });
  window.google.accounts.id.renderButton(googleContainer.value, {
    width: 400,
  });
});
</script>

<style lang="scss">
.hp-google-auth {
  max-width: 100%;
}
</style>
