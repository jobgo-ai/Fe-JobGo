<template>
  <div>
    <router-link to="/new-opening">New Opening</router-link>
    <div v-if="candidates.length > 0">
      Candidate List
      <div
        @click="
          router.push(
            `/openings/${route.params.openingRef}/candidates/${candidate.reference}`
          )
        "
        :key="candidate.reference"
        v-for="candidate in candidates"
      >
        {{ candidate.name }}
      </div>
    </div>
    <router-view :openings="openings"></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useGet } from "@/hooks/useHttp.js";

const route = useRoute();
const router = useRouter();

const openings = ref([]);
const candidates = ref([]);

const fetchCandidates = async () => {
  const getCandidates = useGet(`roles/${route.params.openingRef}/candidates`);
  await getCandidates.get();
  candidates.value = getCandidates.data.value?.candidates;
};

onMounted(async () => {
  const getRoles = useGet("roles");
  getRoles.get();
  await getRoles.get();
  openings.value = getRoles.data.value.roles;
  if (!route.params.openingRef) {
    router.push(`/openings/${getRoles.data.value.roles[0].reference}`);
  } else {
    await fetchCandidates();
  }
});

watch(
  () => route.params.openingRef,
  async () => {
    if (route.params.openingRef) {
      await fetchCandidates();
    }
  }
);
</script>

<style lang="scss" scoped></style>
