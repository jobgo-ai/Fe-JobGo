<template>
  <component :is="avatar" role="img" :alt="avatar" class="hp-abstract-avatar" />
</template>

<script setup>
const props = defineProps({
  abstractKey: {
    type: [String, Number],
    default: "1",
  },
});
import { defineAsyncComponent } from "vue";

const avatar = defineAsyncComponent(() =>
  import(
    /* @vite-ignore */ `../assets/abstracts/avatars/avatar_${props.abstractKey}.svg`
  )
);
</script>

<style lang="scss">
.hp-abstract-avatar {
  height: 40px;
  width: 40px;
  border-radius: $border-radius-lg
}
</style>
