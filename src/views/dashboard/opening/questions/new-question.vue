<template>
  <div>
    <h2>Create question</h2>
    <form @submit.prevent="onSubmit">
      <hp-input label="Add question" name="content"></hp-input>
      <hp-input label="Duration" name="duration"></hp-input>
      <hp-button type="submit" label="Create"></hp-button>
    </form>
  </div>
</template>

<script setup>
//Vendor
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";

//Hooks
import { usePost } from "@/hooks/useHttp";

const schema = yup.object({
  content: yup.string().required("A question is required"),
  duration: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { value: "", duration: "" },
});

const postQuestion = usePost("questions");
const onSubmit = handleSubmit(async (values) => {
  const formattedValues = {
    ...values,
    scoring: "likert",
    type: "open",
    duration: (values.duration * 60).toFixed(),
    guidelines: [],
    skills: values.skills ? values.skills : [],
    levels: [],
  };

  await postQuestion.post({ question: { ...formattedValues, templates: [] } });
});

const isAddNewOpeningModalOpen = ref(false);
</script>
