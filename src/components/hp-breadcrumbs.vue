<template>
  <div class="breadcrumbs">
    <ol>
      <router-link tag="li" :to="'crumb'" v-for="crumb in crumbs">{{
        crumb.label
      }}</router-link>
    </ol>
    <div class="context">
      eee
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  crumbs: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: purple;
}
</style>
