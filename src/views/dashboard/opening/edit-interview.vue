<template>
  <div>
    <hp-drawer :isOpen="isAddQuestionDrawerOpen"
      ><questions @updateQuestionList="fetchInterview"
    /></hp-drawer>
    <form @submit.prevent="onSubmit">
      <div>Create interview</div>
      <hp-input label="Name" name="name"></hp-input>
      <hp-input label="Description" name="description"></hp-input>
      <div>
        <div>
          <h3>Warmup</h3>
          <div>
            <hp-textarea name="warmup" />
            <hp-counter />
          </div>
        </div>
        <div>
          <h3>Cooldown</h3>
          <div>
            <hp-textarea name="cooldown" />
            <hp-counter />
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
// TODO: Make this a router vue
import Questions from "@/views/dashboard/opening/questions/questions.vue";

//Components
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpCounter from "@/components/hp-counter.vue";
import HpDrawer from "@/components/hp-drawer.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";

//Hooks
import { usePut, useGet } from "@/hooks/useHttp";

const route = useRoute();
const isAddQuestionDrawerOpen = ref(false);
const interview = ref({});

const putInterview = usePut(`templates/${route.params.interviewRef}`);

const schema = yup.object({
  name: yup.string().required("Interview name is required"),
  description: yup.string(),
  warmup: yup.string(),
  cooldown: yup.string(),
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
});

const onSubmit = handleSubmit(async (values) => {
  await putInterview.put({ template: { ...values, jobLevels: [] } });
});
</script>
