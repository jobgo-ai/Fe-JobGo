<template>
  <div class="header">
    <div>Hireproof</div>
    <hp-popper>
      <Button>Demo</Button>
      <template #content>
        <div>This is the Popper content 🍿</div>
      </template>
    </hp-popper>
    <router-link to="/settings">Nick Barth</router-link>
  </div>
</template>

<script setup>
import HpPopper from "@/components/hp-popper.vue";
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  background-color: red;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
