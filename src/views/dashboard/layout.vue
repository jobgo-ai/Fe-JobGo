<template>
  <div>
    <hp-header></hp-header>
    <main class="main">
      <router-view class="router-view" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<script setup>
// Components
import HpHeader from "@/components/hp-header.vue";
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  max-width: 1400px;
  position: relative;
  margin: auto;
  padding-top: $header-height;
}

.router-view {
  width: 100%;
}
</style>
