<template>
  <div>
    <hp-breadcrumbs :opening="opening" />
    <router-view v-slot="{ Component }">
      <component :opening="opening" :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
// Vendor
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// Components
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";

// Hooks
import { useGet } from "@/hooks/useHttp";

const opening = ref(null);
const interview = ref(null);
const route = useRoute();

watch(
  () => route.params.openingRef,
  async (newOpeningRef) => {
    if (!newOpeningRef) {
      return;
    }
    const getOpening = useGet(`openings/${newOpeningRef}`);
    await getOpening.get();
    opening.value = getOpening.data.value.opening;
  },
  { immediate: true }
);

watch(
  () => route.params.interviewRef,
  async (newOpeningRef) => {
    if (route.params.interviewRef) {
      const getInterview = useGet(`templates/${route.params.interviewRef}`);
      await getInterview.get();
      interview.value = getInterview.data.value;
    }
  },
  { immediate: true }
);
</script>
