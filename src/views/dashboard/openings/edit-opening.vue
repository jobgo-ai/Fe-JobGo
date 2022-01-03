<template>
  <div>
    <hp-breadcrumbs
      :crumbs="[{ label: 'Crumb1' }, { label: 'crumb2' }]"
    ></hp-breadcrumbs>
    <div>edit Opening</div>
    <form @submit.prevent="handleSubmit">
      <hp-input name="name"></hp-input>
      <hp-input name="description"></hp-input>
      <hp-button type="submit" label="Edit role"></hp-button>
    </form>
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
    <hp-button
      @handleClick="archiveOpening"
      label="Archive opening"
    ></hp-button>
  </div>
</template>

<script setup>
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import { useGet, useDelete } from "@/hooks/useHttp";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

const route = useRoute();
const router = useRouter();
const templates = ref([]);

const schema = yup.object({
  name: yup.string().required("Job title is required"),
  description: yup.string(),
});

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: schema,
});

onMounted(async () => {
  if (route.params.openingRef) {
    const getOpening = useGet(`roles/${route.params.openingRef}`);
    await getOpening.get();
    templates.value = getOpening.data.value.role.templates;
    setFieldValue("name", getOpening.data.value.role.name);
    setFieldValue("description", getOpening.data.value.role.description);
  }
});

const archiveOpening = async () => {
  const deleteOpening = useDelete(`roles/${route.params.openingRef}`);
  await deleteOpening.remove();
  router.push("/openings");
};
</script>
