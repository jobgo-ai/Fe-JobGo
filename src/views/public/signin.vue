<template>
  <div>
    signin
    <hp-input v-model="username" label="username" />
    <hp-input v-model="password" label="username" type="password" />
    <hp-button @handleClick="onSubmit" label="Signin"></hp-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import HpInput from "@/components/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import useAuth from "@/hooks/useAuth";
import { usePost } from "@/hooks/useHttp";

const router = useRouter();
const postLogin = usePost("self/login");

const username = ref("");
const password = ref("");

const onSubmit = async (values) => {
  const data = {
    credentials: { email: username.value, password: password.value },
  };
  await postLogin.post(data);
  if (postLogin.data.value) {
    const { setUser } = useAuth();
    setUser(postLogin.data.value, true);
    router.push("/openings");
  }
};
</script>
