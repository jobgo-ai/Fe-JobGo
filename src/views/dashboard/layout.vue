<template>
  <div>
    <hp-header></hp-header>
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<script setup>
import HpHeader from "@/components/hp-header.vue";
</script>
