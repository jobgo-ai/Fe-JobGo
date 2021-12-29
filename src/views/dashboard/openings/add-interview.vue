<template>
  <div>
    <hp-breadcrumbs></hp-breadcrumbs>
    <div>Add interviews</div>
    <router-link
      :to="`/openings/${route.params.openingRef}/edit/create-interview`"
      >From scratch</router-link
    >
    <ol>
      <li v-for="template in templates" :key="template.reference">
        {{ template.name }}
      </li>
    </ol>
  </div>
</template>

<script setup>
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import { useGet } from "@/hooks/useHttp";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const templates = ref([]);

onMounted(async () => {
  const getTemplates = useGet(`templates`);
  await getTemplates.get();

  templates.value = getTemplates.data.value.templates;
});
</script>
