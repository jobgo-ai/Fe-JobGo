<template>
  <div>
    <router-view v-slot="{ Component }">
      <component :opening="opening" :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
// Vendor
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// Hooks
import { useGet } from "@/hooks/useHttp";
import useOpenings from "@/hooks/useOpenings";

const interview = ref(null);
const route = useRoute();

const { fetchOpening, opening } = useOpenings();

watch(
  () => route.params.openingRef,
  async (newOpeningRef) => {
    if (!newOpeningRef) {
      return;
    }
    fetchOpening(newOpeningRef);
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
