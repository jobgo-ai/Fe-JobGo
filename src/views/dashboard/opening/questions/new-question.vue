<template>
  <div class="new-question">
    <div
      v-if="!question"
      class="new-question__back"
      @click="emits('handleTabChange')"
    >
      <hp-icon name="arrow-left"></hp-icon>Back
    </div>
    <div class="new-question__header">
      <h2 class="new-question__title">Create question</h2>
      <p class="new-question__subtitle">
        This is the question prompt, it is important that this is readable
      </p>
    </div>
    <form @submit.prevent="onSubmit" class="new-question__form">
      <div class="new-question__question">
        <hp-input name="content" placeholder="Type the question"></hp-input>
      </div>
      <div class="new-question__duration">
        <div class="new-question__duration__labels">
          <div class="new-question__label">Duration time</div>
          <div class="new-question__sublabel">
            Expected duration, in minutes
          </div>
        </div>
        <hp-counter name="duration" />
      </div>
      <div class="new-question__dropdowns">
        <div class="new-question__duration__labels">
          <div class="new-question__label">Skills</div>
          <div class="new-question__sublabel">
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
      <div class="new-question__dropdowns">
        <div class="new-question__duration__labels">
          <div class="new-question__label">Levels</div>
          <div class="new-question__sublabel">
            Which candidate seniority levels can this question be used for?
          </div>
        </div>
        <hp-tagger
          label="Levels"
          :options="jobLevelOptions"
          name="levels"
          v-model="levels"
        ></hp-tagger>
      </div>
      <div class="new-question__guidelines">
        <div class="new-question__label">Guidelines</div>
        <div class="new-question__sublabel">
          Describe what you would see in a perfect answer
        </div>
        <hp-multi-input name="guidelines" />
      </div>
    </form>
    <div class="new-question__actions">
      <hp-button
        :isDisabled="!meta.dirty"
        primary
        label="Create question"
        @handleClick="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
//Vendor
import { ref, computed, onMounted } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute } from "vue-router";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpCounter from "@/components/hp-counter.vue";
import HpButton from "@/components/hp-button.vue";
import HpTagger from "@/components/form/hp-tagger.vue";
import HpIcon from "@/components/hp-icon.vue";
import HpMultiInput from "@/components/form/hp-multi-input.vue";

// Hooks
import useSkillSearch from "@/hooks/useSkillSearch";
import useConstants from "@/hooks/useConstants";
import { usePost } from "@/hooks/useHttp";

const props = defineProps({
  question: {
    type: Object,
  },
});

const emits = defineEmits(["handleTabChange"]);

const skillOptions = ref([]);

const skills = ref([]);
const levels = ref([]);

const { handleSkillSearch } = useSkillSearch();
const { jobLevels } = useConstants();

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
  duration: yup.number(),
  skills: yup.array().required(),
  levels: yup.array(),
  guidelines: yup.array(),
});

let initialValues = {};

if (props.question) {
  console.log(props.question);
}

const { handleSubmit, meta } = useForm({
  validationSchema: schema,
  initialValues: initialValues,
});

const { searchSkills } = useSkillSearch();
const postQuestion = usePost("questions");
const onSubmit = handleSubmit(async (values) => {
  const formattedValues = {
    ...values,
    scoring: "likert",
    type: "open",
    duration: (values.duration * 60).toFixed(),
    guidelines: [],
    skills: values.skills ? values.skills : [],
    jobLevels: [],
  };

  await postQuestion.post({
    question: { ...formattedValues, templates: [route.params.interviewRef] },
  });
  const postTemplateQuestion = usePost(
    `templates/${route.params.interviewRef}/questions`
  );
  await postTemplateQuestion.post({
    question: postQuestion.data.value.question.reference,
  });
  emits("updateList");
});
</script>

<style lang="scss">
.new-question {
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
    justify-content: space-between;
    align-content: center;
    padding-bottom: 16px;
    border-bottom: 1px dashed var(--color-border);
    &__labels {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
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
    justify-content: end;
    background-color: var(--color-background);
    z-index: 1000;
    position: fixed;
    bottom: 0;
    padding: 16px;
    right: 0;
    width: 33%;
    max-width: 480px;
    border-top: 1px dashed var(--color-border);
  }
}
</style>
