<template>
  <div>
    <hp-drawer
      :isOpen="isAddQuestionDrawerOpen"
      @close="isAddQuestionDrawerOpen = false"
    >
      <questions v-if="isAddQuestionDrawerOpen" />
    </hp-drawer>
    <div class="edit-interview" v-if="!isLoading">
      <form @submit.prevent="handleContextFormSave">
        <h2 class="edit-interview__title">Edit interview</h2>
        <p class="edit-interview__subtitle">
          Design the template by editing ceremonies and interview questions.
        </p>
        <hp-input label="Name" name="name"></hp-input>
        <div>
          <div class="edit-interview__ceremony">
            <div class="edit-interview__ceremony__header">
              <div>
                <h3 class="edit-interview__ceremony__header__title">Warmup</h3>
                <p class="edit-interview__ceremony__header__subtitle">
                  Set warmup instructions and expected duration
                </p>
              </div>
              <hp-counter name="ceremony.warmup.duration" />
            </div>
            <div>
              <hp-textarea :rows="6" name="ceremony.warmup.content" />
            </div>
          </div>
          <div
            class="edit-interview__ceremony edit-interview__ceremony--cooldown"
          >
            <div class="edit-interview__ceremony__header">
              <div>
                <h3 class="edit-interview__ceremony__header__title">
                  Cooldown
                </h3>
                <p class="edit-interview__ceremony__header__subtitle">
                  Set Cooldown instructions and expected duration
                </p>
              </div>
              <hp-counter name="ceremony.cooldown.duration" />
            </div>
            <div>
              <hp-textarea :rows="6" name="ceremony.cooldown.content" />
            </div>
          </div>
        </div>
      </form>
      <h3 class="edit-interview__ceremony__header__title">Questions</h3>
      <hp-button
        class="edit-interview__questions-button"
        @handleClick="isAddQuestionDrawerOpen = true"
        label="Add question"
        type="button"
        icon="plus"
        dropzone
      ></hp-button>
      <ol>
        <li v-for="question in interview.questions" :key="question">
          {{ question.content }}
        </li>
      </ol>
    </div>
    <hp-spinner v-else size="24" content />
  </div>
</template>

<script setup>
//Vendor
import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";
import * as yup from "yup";

//Views
import Questions from "@/views/dashboard/opening/questions/questions.vue";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpCounter from "@/components/hp-counter.vue";
import HpDrawer from "@/components/hp-drawer.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import HpSpinner from "@/components/hp-spinner.vue";

//Hooks
import { usePut, useGet } from "@/hooks/useHttp";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import useContextSave from "@/hooks/useContextSave";

const props = defineProps({
  opening: {
    type: Object,
    required: true,
  },
});

const isLoading = ref(true);
const route = useRoute();
const isAddQuestionDrawerOpen = ref(false);
const interview = ref({});

const putInterview = usePut(`templates/${route.params.interviewRef}`);

const schema = yup.object({
  name: yup.string().required("Interview name is required"),
  description: yup.string().nullable(),
  ceremony: yup.object({
    cooldown: yup.object({
      content: yup.string(),
      duration: yup.number(),
    }),
    warmup: yup.object({
      content: yup.string(),
      duration: yup.number(),
    }),
  }),
});

const fetchInterview = async () => {
  isLoading.value = true;
  const getInterview = useGet(`templates/${route.params.interviewRef}`);
  await getInterview.get();
  interview.value = getInterview.data.value.template;
};

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema,
  initialValues: interview.value,
});

onMounted(async () => {
  await fetchInterview();
  resetForm({ touched: false, values: interview.value });
  const { setBreadcrumbs } = useBreadcrumbs();
  setBreadcrumbs(
    [
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
        to: `/opening/${props.opening.reference}/edit/add-interview`,
      },
      {
        to: `/opening/${props.opening.reference}/edit/edit-interview/${route.params.interviewRef}`,
        label: "Edit interview",
      },
    ],
    true
  );
  isLoading.value = false;
});

const onSubmit = handleSubmit(async (values) => {
  const formattedQuestions = values?.questions.map((q) => q.reference) || [];
  await putInterview.put({
    template: { ...values, jobLevels: [], questions: formattedQuestions },
  });
});

const { handleContextFormSave } = useContextSave(meta, onSubmit);
</script>

<styles lang="scss">
.edit-interview {
  max-width: 552px;
  margin: auto;
  &__title {
    @include text-h2;
    font-weight: 600;
  }
  &__subtitle {
    @include text-h5;
    color: var(--color-text-secondary);
    margin-bottom: 32px;
  }
  &__questions-button {
    margin-top: 16px;
  }
  &__ceremony {
    &--cooldown {
      border-bottom: 1px dashed var(--color-border);
      margin-bottom: 16px;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      &__title {
        @include text-h5;
        font-weight: 500;
      }
      &__subtitle {
        color: var(--color-text-secondary);
      }
    }
  }
}
</styles>
