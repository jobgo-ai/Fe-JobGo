<template>
  <component :is="avatar" role="img" :alt="avatar" class="hp-abstract-avatar" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const avatar = defineAsyncComponent(() =>
  import(/* @vite-ignore */ `../assets/abstracts/avatars/avatar_6.svg`)
);
</script>

<style lang="scss">
.hp-abstract-avatar {
  height: 40px;
  width: 40px;
  border-radius: 12px;
}
</style>
