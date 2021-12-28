<template>
  <div class="openings">
    <div
      class="candidate-list"
      :class="{ 'candidate-list--left': isCandidateDetailsOpen }"
    >
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
    </div>
    <div class="view" :class="{ 'view--left': isCandidateDetailsOpen }">
      <router-view :openings="openings"></router-view>
    </div>
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
const isCandidateDetailsOpen = ref(false);

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
  isCandidateDetailsOpen.value = route.path.includes("/candidates");
  if (!route.params.openingRef) {
    router.push(`/openings/${getRoles.data.value.roles[0].reference}`);
  } else {
    await fetchCandidates();
  }
});

watch(
  () => route.path,
  async () => {
    isCandidateDetailsOpen.value = route.path.includes("/candidates");
  }
);

watch(
  () => route.params.openingRef,
  async () => {
    if (route.params.openingRef) {
      await fetchCandidates();
    }
  }
);
</script>

<style lang="scss" scoped>
.openings {
  display: flex;
  width: 100%;
}
.candidate-list {
  padding: 10px;
  background-color: green;
  position: absolute;
  height: 100%;
  transition: all 0.15s ease-in-out;
  transform: translateX(0);
  right: 0;
  width: 194px;
  &--left {
    right: 100%;
    transform: translateX(100%);
  }
}

.view {
  display: flex;
  &--left {
    margin-left: 240px;
  }
}
</style>
