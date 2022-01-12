<template>
  <div>
    <hp-header></hp-header>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
// Vendor
import { onMounted } from "vue";

//  Hooks
import useConstants from "@/hooks/useConstants";

// Components
import HpHeader from "@/components/hp-header.vue";

const { loadCompetencies, loadQuestionLevels } = useConstants();

onMounted(() => {
  loadCompetencies();
  loadQuestionLevels();
});
</script>
