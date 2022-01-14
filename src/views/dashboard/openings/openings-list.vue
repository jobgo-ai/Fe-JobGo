<template>
  <div class="opening-list">
    <h2>Openings</h2>
    <ol class="opening-list__grid" v-if="openings.length > 0">
      <div class="opening-list__grid-item" @click="handleNewOpening">
        New opening
      </div>
      <li
        class="opening-list__grid-item"
        @click="router.push(`/openings/${opening.reference}`)"
        :key="opening.reference"
        v-for="opening in openings"
      >
        {{ opening.name }}
      </li>
    </ol>
  </div>
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

<style lang="scss" scoped>
.opening-list {
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  &__grid-item {
    background-color: blue;
    padding: 80px;
  }
}
</style>
