<template>
  <div @click="handleNewOpening">New opening</div>
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
//Vendor
import { ref } from "vue";
import { useRouter } from "vue-router";

//Hooks
import { usePost } from "@/hooks/useHttp";

const props = defineProps({
  openings: {
    type: Array,
    default: [],
  },
});

const router = useRouter();
const postOpening = usePost("openings");
const handleNewOpening = async () => {
  await postOpening.post({
    opening: {
      name: `Opening #${props.openings.length + 1}`,
      description: "",
      templates: [],
    },
  });
  if (postOpening.data.value) {
    router.push(`/opening/${postOpening.data.value.opening.reference}/edit`);
  }
};
</script>
