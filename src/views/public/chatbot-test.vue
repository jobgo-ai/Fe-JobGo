<template>
  <hp-modal :isOpen="isManualJDOpen" @close="isManualJDOpen = false">
    <generic-modal title="Enter Job Description" subtitle="This will create and share a report for this candidate">
      <form @submit="onSubmit">
        <hp-textarea label="Description" v-model="textareaValue" rows="8" name="description"></hp-textarea>
      </form>
      <template #actions>
        <hp-button @click="onSubmit" icon="send" label="Visit report"></hp-button>
      </template>
    </generic-modal>
  </hp-modal>
  <df-messenger project-id="recruitment-profiling" agent-id="17a4859e-a2f5-4abb-8444-6f0546455a42"
    df-messenger-chat-background="#e89999" df-messenger-chat-collapse-icon-size="100px" language-code="en">
    <df-messenger-chat-bubble df-messenger-chat-collapse-icon-size="12px" allow-fullscreen="always" expanded="true"
      chat-close-icon="false" chat-title="Jobgo AI Profiling"></df-messenger-chat-bubble>
  </df-messenger>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import HpModal from "@/components/hp-modal.vue";
import HpButton from "@/components/hp-button.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
import GenericModal from "@/components/modals/generic-modal.vue";
import { state } from "@/composables/useAuth";

console.log("state.token - ", state.token);

const router = useRouter();
const chatParameter = ref({});
const isManualJDOpen = ref(false);
const textareaValue = ref("dcsdc");

const { handleSubmit } = useForm({
  initialValues: {
    description: "",
  },
});

onMounted(() => {
  const dfMessenger = document.querySelector("df-messenger");

  dfMessenger.renderCustomText(
    "Hello! I'm here to assist you in gathering information swiftly for the position you're looking to fill. How can I help you with the details of the job you have in mind? 😊"
  );

  window.addEventListener("df-response-received", (event) => {
    chatParameter.value = event?.detail?.raw?.queryResult?.parameters;
  });

  window.addEventListener("df-chip-clicked", (event) => {
    if (event.detail.text === "Manual Job Description") {
      isManualJDOpen.value = true;
    }
  });

  window.addEventListener("df-chat-open-changed", () => {
    dfMessenger.startNewSession({ retainHistory: false });

    var elements = document.getElementsByClassName("minimize-action");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }

    document
      .querySelector("df-messenger")
      .shadowRoot.querySelector("df-messenger-titlebar").style.height = "25vh";

    dfMessenger.renderCustomText(
      "Hello! I'm here to assist you in gathering information swiftly for the position you're looking to fill. How can I help you with the details of the job you have in mind? 😊"
    );
  });

  window.addEventListener("df-session-ended", (event) => {
    console.log("session end :- ", chatParameter.value, event);
    onHandleProject(chatParameter.value);
  });
});

const onHandleProject = async (chatObject) => {
  console.log("chatObject:- ", chatObject);

  const { position_name, candidate_experience, location_type, candidate_education, job_description_type, job_description } = chatObject;

  const payload = {
    "jobPosition": position_name,
    "experience": candidate_experience,
    "location": location_type,
    "education": candidate_education,
    "job_description_type": job_description_type,
    "salary": "$100,000 - $120,000",
    "fullDescription": job_description
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/opening`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
        "Csrf-Token": "nocheck",
      },
      body: JSON.stringify(payload),
    });

    router.push("/openings");
    console.log("Resposnse :- ", res);
  }
  catch (error) {
    console.log(error);
  }
}

const onSubmit = handleSubmit(async (values) => {
  const dfMessenger = document.querySelector("df-messenger");
  const queryParameters = {
    parameters: {
      job_description: "assax",
    },
  };
  await dfMessenger.setQueryParameters(queryParameters);
  isManualJDOpen.value = false;
});
</script>

<style scoped>
.minimize-action {
  display: none !important;
}

.remove {
  display: none !;
}

.minimize-action .focus-outline-contrast {
  display: none !important;
}
</style>