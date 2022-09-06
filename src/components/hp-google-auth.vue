<template>
  <div class="hp-google-auth__container" ref="container">
    <div class="hp-google-auth" ref="googleContainer"></div>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

// Composables
import { usePost } from "@/composables/useHttp";
import useAuth from "@/composables/useAuth";

const props = defineProps({
  isSignIn: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const googleContainer = ref(null);
const container = ref(null);
const emits = defineEmits(["handleSignIn"]);
const handleLogin = async (res) => {
  const { setUser, refreshToken } = useAuth();
  const postUser = usePost("sso");
  await postUser.post({
    sso: {
      provider: "google",
      token: res.credential,
    },
  });

  setUser(postUser.data.value.self);
  const refresh = await refreshToken();
  router.push("/");
};

const gapiKey = import.meta.env.VITE_GAPI_KEY;

onMounted(() => {
  const width = container.value.getBoundingClientRect().width;
  window.google.accounts.id.initialize({
    client_id: gapiKey,
    callback: handleLogin,
    context: "use",
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
