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
  console.log("fuck");
  console.log(res);
  emits("handleSignIn", res);
};

const gapiKey = import.meta.env.VITE_GAPI_KEY;

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id:
      "234767228331-8kgljiso4om2j81renqs42ldqhhfc5on.apps.googleusercontent.com",
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
