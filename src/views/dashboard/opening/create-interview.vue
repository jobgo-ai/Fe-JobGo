<template>
  <div>
    <hp-drawer :isOpen="isAddQuestionDrawerOpen"><questions /></hp-drawer>
    <hp-breadcrumbs></hp-breadcrumbs>
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
          <h3>Cooldwon</h3>
          <div>
            <hp-textarea name="cooldown" />
            <hp-counter />
          </div>
        </div>
      </div>
      <hp-button
        @handleClick="isAddQuestionDrawerOpen = true"
        label="Add questions"
        type="button"
      ></hp-button>
      <hp-button type="submit" label="Create"></hp-button>
    </form>
  </div>
</template>

<script setup>
//Vendor
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

//Views
// TODO: Make this a router vue
import Questions from "@/views/dashboard/opening/questions/questions.vue";

//Components
import HpBreadcrumbs from "@/components/hp-breadcrumbs.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import HpCounter from "@/components/hp-counter.vue";
import HpDrawer from "@/components/hp-drawer.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";

//Hooks
import { usePost } from "@/hooks/useHttp";

const isAddQuestionDrawerOpen = ref(false);

const postInterview = usePost("templates");

const schema = yup.object({
  name: yup.string().required("Interview name is required"),
  description: yup.string(),
  warmup: yup.string(),
  cooldown: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { name: "", description: "" },
});

const onSubmit = handleSubmit(async (values) => {
  await postInterview.post({ template: { ...values, levels: [] } });
});
</script>
