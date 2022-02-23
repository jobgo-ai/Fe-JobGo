<template>
  <div class="edit-question">
    <div v-if="!question" class="edit-question__back" @click="handleClose">
      <hp-icon name="arrow-left"></hp-icon>Back
    </div>
    <div class="edit-question__header">
      <h2 class="edit-question__title">{{ content.title }}</h2>
      <p class="edit-question__subtitle">
        This is the question prompt, it is important that this is readable
      </p>
    </div>
    <form @submit.prevent="onSubmit" class="edit-question__form">
      <div class="edit-question__question">
        <hp-input
          ref="questionInputRef"
          name="content"
          placeholder="Type the question"
        ></hp-input>
      </div>
      <div class="edit-question__duration">
        <div class="edit-question__duration__container">
          <div class="edit-question__duration__labels">
            <div class="edit-question__label">Duration time</div>
            <div class="edit-question__sublabel">
              Expected duration, in minutes
            </div>
          </div>
          <hp-counter name="duration" />
        </div>
        <div class="edit-question__duration__error">{{ errors.duration }}</div>
      </div>
      <div class="edit-question__dropdowns">
        <div class="edit-question__duration__labels">
          <div class="edit-question__label">Skills</div>
          <div class="edit-question__sublabel">
            What does this question measure? Max of 3 skills.
          </div>
        </div>
        <hp-tagger
          label="Skills"
          :options="skillOptions"
          name="skills"
          searchable
          :onSearch="searchFunction"
          v-model="skills"
          :max="3"
        ></hp-tagger>
      </div>
      <div class="edit-question__dropdowns">
        <div class="edit-question__duration__labels">
          <div class="edit-question__label">Levels</div>
          <div class="edit-question__sublabel">
            Which candidate seniority levels can this question be used for?
          </div>
        </div>
        <hp-tagger
          label="Levels"
          :options="jobLevelOptions"
          name="jobLevels"
          v-model="levels"
        ></hp-tagger>
      </div>
      <div class="edit-question__guidelines">
        <div class="edit-question__label">Guidelines</div>
        <div class="edit-question__sublabel">
          Describe what you would see in a perfect answer
        </div>
        <hp-multi-input name="guidelines" />
      </div>
      <div class="edit-question__actions">
        <hp-button
          :isDisabled="!meta.dirty || !meta.valid"
          primary
          type="submit"
          :isLoading="isSaving"
          :label="content.action"
        />
      </div>
    </form>
    <hp-danger-zone
      v-if="isEdit"
      class="edit-interview__danger-zone"
      label="Delete question template"
      :onConfirm="handleDeleteQuestiontemplate"
    ></hp-danger-zone>
  </div>
</template>

<script setup>
//Vendor
import { ref, computed, onMounted, watchEffect } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute } from "vue-router";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpCounter from "@/components/hp-counter.vue";
import HpButton from "@/components/hp-button.vue";
import HpTagger from "@/components/form/hp-tagger.vue";
import HpDangerZone from "@/components/cards/hp-danger-zone-card.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpMultiInput from "@/components/form/hp-multi-input.vue";

// Composables
import { hasEditPermission } from "@/composables/usePermissions.js";
import useSkillSearch from "@/composables/useSkillSearch";
import useConstants from "@/composables/useConstants";
import useInterviews from "@/composables/useInterviews";
import useToast from "@/composables/useToast";
import { usePost, usePut, useDelete } from "@/composables/useHttp";
import useQuestionContext from "@/composables/useQuestionContext";

const props = defineProps({
  question: {
    type: Object,
  },
});

const isEdit = props.question;

const content = isEdit
  ? {
      title: "Edit question",
      action: "Edit question",
    }
  : { title: "Create question", action: "Create question" };

const emits = defineEmits(["handleTabChange", "handleClose"]);

const skillOptions = ref([]);

const skills = ref([]);
const levels = ref([]);

const { handleSkillSearch } = useSkillSearch();
const { jobLevels } = useConstants();

const isSaving = ref(false);

const questionInputRef = ref(null);
watchEffect(() => {
  if (questionInputRef.value) {
    questionInputRef.value.inputRef.focus();
  }
});

const jobLevelOptions = computed(() => {
  return jobLevels.value.map((j) => ({ label: j.name, value: j.slug }));
});

const searchFunction = async (value) => {
  skillOptions.value = await handleSkillSearch(value);
};

onMounted(async () => {
  skillOptions.value = await handleSkillSearch("");
});

const route = useRoute();

const schema = yup.object({
  content: yup.string().required("A question is required"),
  duration: yup
    .number()
    .typeError("Duration must be a number")
    .min(0)
    .max(60)
    .required("A duration is required"),
  skills: yup.array().nullable(),
  levels: yup.array(),
  guidelines: yup.array(),
});

let initialValues = {
  duration: 5,
};

if (props.question) {
  skills.value = props.question.skills.map((s) => ({
    label: s.name,
    value: s.slug,
  }));

  levels.value = props.question.jobLevels.map((s) => ({
    label: s.name,
    value: s.slug,
  }));

  const formattedInitialValues = {
    content: props.question.content,
    duration: props.question.duration / 60,
    guidelines: props.question.guidelines,
    skills: skills.value,
    jobLevels: levels.value,
  };
  initialValues = formattedInitialValues;
}

const { handleSubmit, meta, errors } = useForm({
  validationSchema: schema,
  initialValues: initialValues,
});

// State that interacts with parent to make sure we don't accidently close the modal
const { clearIsDirty } = useQuestionContext(meta, "edit");

const { fetchInterview, setInterview } = useInterviews();
const { setToast } = useToast();

const onSubmit = handleSubmit(async (values) => {
  isSaving.value = true;
  const formattedValues = {
    ...values,
    scoring: "likert",
    type: "open",
    duration: values.duration * 60,
    jobLevels: values.jobLevels.map((l) => l.value),
    skills: values.skills.map((s) => s.value),
  };

  if (props.question?.reference) {
    const putQuestion = usePut(`questions/${props.question.reference}`);
    await putQuestion.put({
      question: { ...formattedValues },
    });
    await fetchInterview(route.params.interviewRef);
    setToast({
      type: "positive",
      title: "Well done!",
      message: `Question edited successfully`,
    });
  } else {
    const postQuestion = usePost("questions");
    await postQuestion.post({
      question: { ...formattedValues, templates: [route.params.interviewRef] },
    });
    const postTemplateQuestion = usePost(
      `templates/${route.params.interviewRef}/questions`
    );
    await postTemplateQuestion.post({
      question: postQuestion.data.value.question.reference,
    });
    setInterview(postTemplateQuestion.data.value.template);
    setToast({
      type: "positive",
      title: "Well done!",
      message: `Question created and added to interview`,
    });
  }

  // Must clear dirty to handle close
  clearIsDirty();
  emits("handleClose");
  isSaving.value = false;
});
const handleClose = () => {
  if (!meta.dirty && meta.valid) {
    emits("handleTabChange");
  }
};

const handleDeleteQuestiontemplate = async () => {
  const deleteQuestion = useDelete(`questions/${props.question.reference}`);
  await deleteQuestion.remove();
  emits("handleClose");
  await fetchInterview(route.params.interviewRef);
  setToast({
    type: "positive",
    title: "Oh my!",
    message: `That question is now in the trash bin`,
  });
};
</script>

<style lang="scss">
.edit-question {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
  padding: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
  &__back {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 16px;
  }
  &__header {
    margin-bottom: 16px;
  }
  &__title {
    @include text-h4;
    font-weight: 500;
  }
  &__subtitle {
    @include text-h5;
    color: var(--color-text-secondary);
  }
  &__question {
    border-bottom: 1px dashed var(--color-border);
    margin-bottom: 16px;
  }
  &__label {
    font-weight: 500;
    @include text-h5;
  }
  &__sublabel {
    @include text-h5;
    font-weight: 300;
    color: var(--color-text-secondary);
  }
  &__guidelines {
    padding-top: 16px;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  &__duration {
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    border-bottom: 1px dashed var(--color-border);
    &__container {
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    &__labels {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }
    &__error {
      color: var(--color-error);
      font-weight: 500;
    }
  }
  &__dropdowns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    padding-bottom: 16px;
    padding-top: 16px;
    border-bottom: 1px dashed var(--color-border);
  }
  &__actions {
    display: flex;
    justify-content: start;
    background-color: var(--color-background);
    z-index: 1000;
    position: fixed;
    bottom: 0;
    padding: 16px;
    right: 0;
    width: 33%;
    max-width: $drawer-max-width;
    border-top: 1px dashed var(--color-border);
  }
}
</style>
