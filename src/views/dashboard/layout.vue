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
// Vendor
import { onMounted, onUnmounted } from "vue";

//  Hooks
import useConstants from "@/composables/useConstants";

// Components
import HpHeader from "@/components/hp-header.vue";

const { loadCompetencies, loadQuestionLevels } = useConstants();

onMounted(() => {
  loadCompetencies();
  loadQuestionLevels();
});
onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  max-width: 1400px;
  position: relative;
  margin: auto;
}

.router-view {
  width: 100%;
}
</style>
