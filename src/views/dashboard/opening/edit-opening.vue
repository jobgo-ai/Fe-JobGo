<template>
  <div>
    <div>edit Opening</div>
    <form @submit.prevent="onSubmit">
      <hp-input name="name"></hp-input>
      <hp-input name="description"></hp-input>
      <hp-button type="submit" label="Edit Opening"></hp-button>
    </form>
    <div>
      <ol>
        <li v-for="template in templates" :key="template.reference">
          {{ template.name }}
          <router-link :to="`edit/edit-interview/${template.reference}`"
            >Edit my precious</router-link
          >
        </li>
      </ol>
      <router-link
        :to="`/opening/${route.params.openingRef}/edit/add-interview`"
        >Add interview</router-link
      >
    </div>
    <hp-button
      @handleClick="archiveOpening"
      label="Archive opening"
    ></hp-button>
  </div>
</template>

<script setup>
import HpInput from "@/components/form/hp-input.vue";
import HpButton from "@/components/hp-button.vue";
import { useGet, usePut, usePatch } from "@/hooks/useHttp";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

const route = useRoute();
const router = useRouter();
const templates = ref([]);
const opening = ref({});

const schema = yup.object({
  name: yup.string().required("Job title is required"),
  description: yup.string(),
});

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  const putOpening = usePatch(`openings/${route.params.openingRef}`);
  await putOpening.patch({ opening: { ...opening, ...values } });
});

onMounted(async () => {
  if (route.params.openingRef) {
    const getOpening = useGet(`openings/${route.params.openingRef}`);
    await getOpening.get();
    opening.value = getOpening.data.value.opening;
    templates.value = getOpening.data.value.opening.templates;
    setFieldValue("name", getOpening.data.value.opening.name);
    setFieldValue("description", getOpening.data.value.opening.description);
  }
});

const archiveOpening = async () => {
  const putOpening = usePut(`openings/${route.params.openingRef}/state`);
  await putOpening.put({
    state: "archived",
  });
  router.push("/openings");
  //Hard delete
  // const deleteOpening = useDelete(`openings/${route.params.openingRef}`);
  // await deleteOpening.remove();
  // router.push("/openings");
};
</script>
