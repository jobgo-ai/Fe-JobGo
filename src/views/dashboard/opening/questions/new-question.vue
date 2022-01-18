<template>
  <div>
    <h2>Create question</h2>
    <form @submit.prevent="onSubmit">
      <hp-input label="Add question" name="content"></hp-input>
      <hp-input label="Duration" name="duration"></hp-input>
      <hp-multi-select
        label="Skills"
        mode="tags"
        :max="3"
        fullWidth
        name="skills"
        :delay="100"
        :canDeselect="true"
        :options="searchSkills"
      ></hp-multi-select>
      <hp-multi-input />
      <hp-button type="submit" label="Create"></hp-button>
    </form>
  </div>
</template>

<script setup>
//Vendor
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute } from "vue-router";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpMultiSelect from "@/components/form/hp-multi-select.vue";
import HpMultiInput from "@/components/form/hp-multi-input.vue";
import HpButton from "@/components/hp-button.vue";

//Hooks
import { usePost } from "@/hooks/useHttp";
import useSkillSearch from "@/hooks/useSkillSearch";

const emits = defineEmits(["updateList"]);

const route = useRoute();

const schema = yup.object({
  content: yup.string().required("A question is required"),
  duration: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { content: "", duration: "" },
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

const isAddNewOpeningModalOpen = ref(false);
</script>
