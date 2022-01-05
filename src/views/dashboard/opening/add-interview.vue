<template>
  <div>
    <hp-modal :isOpen="isAddInterviewModalOpen"
      >Add interview
      <form @submit="onSubmit">
        <hp-input name="name"></hp-input>
        <hp-input name="description"></hp-input>
        <button type="submit">Hello</button>
      </form>
    </hp-modal>
    <hp-breadcrumbs></hp-breadcrumbs>
    <div>Add interviews</div>
    <hp-button
      label="From scratch"
      @handleClick="isAddInterviewModalOpen = true"
    ></hp-button>
    <ol>
      <li v-for="template in templates" :key="template.reference">
        {{ template.name }}
        <hp-button label="View"></hp-button>
      </li>
    </ol>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

// Components
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import HpButton from "@/components/hp-button.vue";
import HpModal from "@/components/hp-modal.vue";
import HpInput from "@/components/form/hp-input.vue";

// Hooks
import { useGet, usePost } from "@/hooks/useHttp";

const templates = ref([]);
const isAddInterviewModalOpen = ref(false);

onMounted(async () => {
  const getTemplates = useGet(`templates`);
  await getTemplates.get();

  templates.value = getTemplates.data.value.templates;
});

const schema = yup.object({
  name: yup.string().required("Job name is required"),
  description: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { name: "", description: "" },
});

const router = useRouter();
const route = useRoute();

const postInterview = usePost("templates");
const onSubmit = handleSubmit(async (values) => {
  await postInterview.post({ template: { ...values, levels: [] } });
  if (postInterview.data.value) {
    router.push(
      `/opening/${route.params.openingRef}/edit/edit-interview/${postInterview.data.value.template.reference}`
    );
  }
});
</script>
