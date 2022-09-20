<template>
  <div class="hp-google-auth__container" ref="container">
    <div class="hp-google-auth" ref="googleContainer"></div>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

// Composables
import { usePost } from "@/composables/useHttp";
import useAuth from "@/composables/useAuth";
import useGoogleAuth from "@/composables/useGoogleAuth";

const props = defineProps({
  isSignIn: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const route = useRoute();

const googleContainer = ref(null);
const container = ref(null);
const emits = defineEmits(["handleSignIn"]);
const handleLogin = async (res) => {
  const { setUser, refreshToken } = useAuth();
  const postUser = usePost("sso");
  let payload = {
    sso: {
      provider: "google",
      token: res.credential,
    },
  };

  if (route.query?.token) {
    payload = { ...payload, invitation: route.query.token };
  }
  await postUser.post(payload);

  setUser({ sessionToken: postUser.data.value.self.sessionToken });
  const refresh = await refreshToken();
  router.push("/");
};

const { isInitialized } = useGoogleAuth();

onMounted(() => {
  if (!isInitialized.value) {
    const gapiKey = import.meta.env.VITE_GAPI_KEY;
    window.google.accounts.id.initialize({
      client_id: gapiKey,
      callback: handleLogin,
      context: "use",
    });
    isInitialized.value = true;
  }
  const width = container.value.getBoundingClientRect().width;
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