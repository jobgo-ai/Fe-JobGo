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
    <div>Add interviews</div>
    <ol>
      <hp-interview-card
        :template="template"
        :key="template.reference"
        v-for="template in availableTemplateList"
      ></hp-interview-card>
    </ol>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

// Components
import HpModal from "@/components/hp-modal.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpInterviewCard from "@/components/hp-interview-card.vue";
// Hooks
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useGet, usePost } from "@/hooks/useHttp";

const props = defineProps({
  opening: {
    type: Object,
    default: false,
  },
});

const templates = ref([]);
const isAddInterviewModalOpen = ref(false);
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(async () => {
  const getTemplates = useGet(`templates`);
  await getTemplates.get();

  templates.value = getTemplates.data.value.templates;

  setBreadcrumbs([
    {
      label: "Openings",
      to: "/openings",
    },
    {
      label: props.opening.name,
      to: `/opening/${props.opening.reference}/edit`,
    },
    {
      label: "Add interview",
      to: `/opening/${props.opening.reference}/view/add-interview`,
    },
  ]);
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
  await postInterview.post({ template: { ...values, jobLevels: [] } });
  if (postInterview.data.value) {
    router.push(
      `/opening/${route.params.openingRef}/edit/edit-interview/${postInterview.data.value.template.reference}`
    );
  }
});

const availableTemplateList = computed(() => {
  return templates.value.filter((template) => {
    return !props.opening.templates.some(
      (t) => t.reference === template.reference
    );
  });
});

const handleAddToInterview = async (template) => {
  const postRole = usePost(`openings/${route.params.openingRef}/templates`);
  const payload = {
    template: template.reference,
  };
  await postRole.post(payload);
  router.push(`/opening/${route.params.openingRef}/edit`);
};
</script>
