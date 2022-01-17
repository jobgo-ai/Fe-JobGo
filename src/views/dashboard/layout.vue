<template>
  <div>
    <hp-header></hp-header>
    <main class="container">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
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

<style lang="scss" scoped>
.container {
  display: flex;
  max-width: 1400px;
  position: relative;
  margin: auto;
}
</style>
