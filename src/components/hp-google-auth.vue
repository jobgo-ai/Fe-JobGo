<template>
  <div class="hp-google-auth__container" ref="container">
    <div class="hp-google-auth" ref="googleContainer"></div>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref, watchEffect } from "vue";
import { useWindowSize } from "@vueuse/core";

// Composables
import { usePost } from "@/composables/useHttp.js";

const props = defineProps({
  isSignIn: {
    type: Boolean,
    default: false,
  },
});
const googleContainer = ref(null);
const container = ref(null);
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
  const width = container.value.getBoundingClientRect().width;
  window.google.accounts.id.initialize({
    client_id: gapiKey,
    callback: handleLogin,
  });
  window.google.accounts.id.renderButton(googleContainer.value, {
    width: width,
  });
});
</script>

<style lang="scss">
.hp-google-auth {
  max-width: 100%;
  &__container {
    width: 100%;
  }
}
</style>
