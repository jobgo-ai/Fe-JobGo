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
  console.log("gutentag niklas");
  console.log(res);
  emits("handleSignIn", res);
};

const gapiKey = import.meta.env.VITE_GAPI_KEY;

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: gapiKey,
    callback: handleLogin,
  });
  window.google.accounts.id.renderButton(googleContainer.value, {});
});
</script>

<style lang="scss">
.hp-google-auth {
  max-width: 100%;
}
</style>
