<template>
  <div>
    <hp-header></hp-header>
    <hp-breadcrumbs v-if="hasBreadCrumbs" />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import HpHeader from "@/components/hp-header.vue";
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";

const hasBreadCrumbs = ref(false);

const route = useRoute();
hasBreadCrumbs.value = route.meta.breadcrumbs;
watch(
  () => route.meta.breadcrumbs,
  async () => {
    hasBreadCrumbs.value = route.meta.breadcrumbs;
  }
);
</script>
