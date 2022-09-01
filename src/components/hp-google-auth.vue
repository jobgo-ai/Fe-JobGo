<template>
  <div class="hp-google-auth" ref="googleContainer"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  isSignIn: {
    type: Boolean,
    default: false,
  },
});
const googleContainer = ref(null);
const emits = defineEmits(["handleSignIn"]);
const handleLogin = (res) => {
  emits("handleSignIn", res);
};

const gapiKey = import.meta.env.VITE_GAPI_KEY;

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: "234767228331",
  });
  window.handleLogin = handleLogin;
  window.google.accounts.id.renderButton(googleContainer.value, {});
});
</script>

<style lang="scss">
.hp-google-auth {
  max-width: 100%;
}
</style>
