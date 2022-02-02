<template>
  <div class="edit-interview">
    <hp-drawer :isOpen="isAddQuestionDrawerOpen"
      ><questions @updateQuestionList="fetchInterview"
    /></hp-drawer>
    <form @submit.prevent="onSubmit" v-if="interview?.reference">
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
            <hp-textarea name="ceremony.warmup.content" />
          </div>
        </div>
        <div>
          <h3>Cooldown</h3>
          <div>
            <hp-textarea name="ceremony.cooldown.content" />
            <hp-counter name="ceremony.cooldown.duration" />
          </div>
        </div>
      </div>
      <div>Questions</div>
      <ol>
        <li v-for="question in interview.questions" :key="question">
          {{ question.content }}
        </li>
      </ol>
      <hp-button
        @handleClick="isAddQuestionDrawerOpen = true"
        label="Add questions"
        type="button"
      ></hp-button>
      <hp-button type="submit" label="Save"></hp-button>
    </form>
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

//Hooks
import { usePut, useGet } from "@/hooks/useHttp";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

const props = defineProps({
  opening: {
    type: Object,
    required: true,
  },
});

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

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: interview.value,
});

const fetchInterview = async () => {
  const getInterview = useGet(`templates/${route.params.interviewRef}`);
  await getInterview.get();
  interview.value = getInterview.data.value.template;
};

onMounted(async () => {
  await fetchInterview();
  setValues(interview.value);
  const { setBreadcrumbs } = useBreadcrumbs();
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
    {
      to: `/opening/${props.opening.reference}/view/add-interview/new`,
      label: "New",
    },
  ]);
});

const onSubmit = handleSubmit(async (values) => {
  const formattedQuestions = values?.questions.map((q) => q.reference) || [];
  await putInterview.put({
    template: { ...values, jobLevels: [], questions: formattedQuestions },
  });
});
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
  &__ceremony {
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
