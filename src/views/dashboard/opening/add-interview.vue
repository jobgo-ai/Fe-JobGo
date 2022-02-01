<template>
  <div class="add-interview">
    <hp-modal :isOpen="isAddInterviewModalOpen"
      >Add interview
      <form @submit="onSubmit">
        <hp-input name="name"></hp-input>
        <hp-input name="description"></hp-input>
        <button type="submit">Hello</button>
      </form>
    </hp-modal>
    <div class="add-interview__header">
      <div class="add-interview__title">Add interviews</div>
      <div class="add-interview__subtitle">
        Select a template or create a new one from scratch
      </div>
    </div>
    <div class="add-interview__filter">
      <hp-input
        name="search"
        variant="search"
        icon="search"
        placeholder="Search by name"
      />
      <div class="add-interview__filter__dropdowns">
        <hp-dropdown
          class="add-interview__filter__dropdowns__dropdown"
          label="All Skills"
        ></hp-dropdown>
        <hp-dropdown
          class="add-interview__filter__dropdowns__dropdown"
          label="Experience levels"
        ></hp-dropdown>
      </div>
    </div>
    <ol class="add-interview__interview-grid">
      <hp-add-interview-card isAddCard></hp-add-interview-card>
      <hp-add-interview-card
        :template="template"
        :key="template.reference"
        v-for="template in availableTemplateList"
      ></hp-add-interview-card>
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
import HpDropdown from "@/components/hp-dropdown.vue";
import HpAddInterviewCard from "@/components/hp-add-interview-card.vue";
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

<style lang="scss">
.add-interview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 840px;
  margin: auto;
  &__header {
    align-self: flex-start;
    margin-bottom: 24px;
  }
  &__title {
    @include text-h2;
    font-weight: 600;
  }
  &__subtitle {
    @include text-h5;
    color: var(--color-text-secondary);
  }
  &__interview-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 24px;
  }
  &__filter {
    display: flex;
    align-items: flex-end;
    margin-bottom: 24px;
    &__dropdowns {
      display: flex;
      margin-bottom: 8px;
      &__dropdown {
        margin-left: 12px;
      }
    }
  }
}
</style>
