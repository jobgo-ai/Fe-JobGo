<template>
  <div>
    <hp-breadcrumbs
      :crumbs="[{ label: 'Crumb1' }, { label: 'crumb2' }]"
    ></hp-breadcrumbs>
    <div>edit Opening</div>
    <hp-input></hp-input>
    <hp-button label="Add interview"></hp-button>
    <div>
      <ol>
        <li v-for="template in templates" :key="template.reference">
          {{ template.name }}
          <router-view :to="`interviews/${template.reference}/edit`"
            >Edit</router-view
          >
        </li>
      </ol>
      <router-link
        :to="`/openings/${route.params.openingRef}/edit/add-interview`"
        >Add interview</router-link
      >
    </div>
  </div>
</template>

<script setup>
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import HpInput from "@/components/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import { useGet } from "@/hooks/useHttp";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const templates = ref([]);

onMounted(async () => {
  if (route.params.openingRef) {
    const getOpening = useGet(`roles/${route.params.openingRef}`);
    await getOpening.get();

    templates.value = getOpening.data.value.role.templates;
  }
});
</script>
