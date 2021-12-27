<template>
  <div>
    <hp-header></hp-header>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import HpHeader from "@/components/hp-header.vue";
</script>
