<template>
  <div class="hp-breadcrumbs">
    <ol v-if="props.opening" class="">
      <li>{{ props.opening.name }}</li>
    </ol>
  </div>
</template>

<script setup>
const props = defineProps({
  opening: {
    type: Object,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.hp-breadcrumbs {
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: purple;
  color: white;
}
</style>
