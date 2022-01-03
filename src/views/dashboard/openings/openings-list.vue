<template>
  <router-link to="/new-opening">New opening</router-link>
  Openings list:
  <ol v-if="openings.length > 0">
    <li
      @click="router.push(`/openings/${opening.reference}`)"
      :key="opening.reference"
      v-for="opening in openings"
    >
      {{ opening.name }}
    </li>
  </ol>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  openings: {
    type: Array,
    default: [],
  },
});
</script>
