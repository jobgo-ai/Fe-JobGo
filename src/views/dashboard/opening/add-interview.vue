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
        class="add-interview__filter__search"
        name="search"
        variant="search"
        icon="search"
        v-model="filter.search"
        placeholder="Search by name"
      />
      <hp-multi-select
        class="add-interview__filter__dropdowns__dropdown"
        label="All Skills"
        :options="skillOptions"
        name="skills"
        searchable
        :onSearch="searchFunction"
        v-model="filter.skills"
      ></hp-multi-select>
      <hp-multi-select
        :options="jobLevelOptions"
        class="add-interview__filter__dropdowns__dropdown"
        label="Experience levels"
        name="levels"
        v-model="filter.jobLevels"
      ></hp-multi-select>
    </div>
    <ol v-if="!isInterviewsLoading" class="add-interview__interview-grid">
      <hp-add-interview-card isAddCard></hp-add-interview-card>
      <hp-add-interview-card
        :template="template"
        :key="template.reference"
        v-for="template in availableTemplateList"
        @handleDelete="onDeleteTemplate"
      ></hp-add-interview-card>
    </ol>
    <hp-spinner v-if="isInterviewsLoading" content size="24" />
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

// Components
import HpModal from "@/components/hp-modal.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpSpinner from "@/components/hp-spinner.vue";
import HpMultiSelect from "@/components/form/hp-multi-select.vue";
import HpAddInterviewCard from "@/components/hp-add-interview-card.vue";
// Composables
import useSkillSearch from "@/composables/useSkillSearch";
import useConstants from "@/composables/useConstants";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import { useGet, usePost, useDelete } from "@/composables/useHttp";

const props = defineProps({
  opening: {
    type: Object,
    default: false,
  },
});

const isInterviewsLoading = ref(true);

const filter = ref({ search: "", skills: [], jobLevels: [] });

const skillOptions = ref([]);

const { handleSkillSearch } = useSkillSearch();
const { jobLevels } = useConstants();

const jobLevelOptions = computed(() => {
  return jobLevels.value.map((j) => ({ label: j.name, value: j.slug }));
});

const searchFunction = async (value) => {
  skillOptions.value = await handleSkillSearch(value);
};

const templates = ref([]);
const isAddInterviewModalOpen = ref(false);
const { setBreadcrumbs } = useBreadcrumbs();

watch(
  () => filter.value,
  () => {
    fetchTemplates();
  },
  { deep: true }
);

const getUrl = (loadingMore) => {
  let url = `templates`;
  var params = new URLSearchParams([["limit", 20]]);
  if (loadingMore) {
    params.append("offset", next);
  }
  if (filter.value.jobLevels.length > 0) {
    const onlySlugs = filter.value.jobLevels.map((j) => j.value);
    params.append("job-levels", onlySlugs.join(","));
  }
  if (filter.value.skills.length > 0) {
    const onlySlugs = filter.value.skills.map((s) => s.value);
    params.append("skills", onlySlugs.join(","));
  }
  if (filter.value.search !== "") {
    params.append("search", filter.value.search);
  }
  return `${url}?${params.toString()}`;
};

const fetchTemplates = async () => {
  isInterviewsLoading.value = true;
  const getTemplates = useGet(getUrl());
  await getTemplates.get();
  templates.value = getTemplates.data.value.templates;
  isInterviewsLoading.value = false;
};

onMounted(async () => {
  const getTemplates = useGet(`templates`);
  skillOptions.value = await handleSkillSearch("");
  await getTemplates.get();

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

  templates.value = getTemplates.data.value.templates;
  isInterviewsLoading.value = false;
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

const onDeleteTemplate = async (template) => {
  const deleteInterview = useDelete(`templates/${template}`);
  await deleteInterview.remove();
  await fetchTemplates();
};

const availableTemplateList = computed(() => {
  return templates.value.filter((template) => {
    return !props.opening.templates.some(
      (t) => t.reference === template.reference
    );
  });
});
</script>

<style lang="scss">
.add-interview {
  @include pageContainer;
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
    margin-bottom: 64px;
  }
  &__filter {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
    &__dropdowns {
      display: flex;
      &__dropdown {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
