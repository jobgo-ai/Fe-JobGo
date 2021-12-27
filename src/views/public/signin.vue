<template>
  <div>
    signin
    <Input v-model="username" label="username" />
    <Input v-model="password" label="username" type="password" />
    <Button @handleClick="onSubmit" label="Signin"></Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/input.vue";
import Button from "@/components/button.vue";
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
