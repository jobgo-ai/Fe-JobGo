<template>
  <hp-modal :isOpen="isManualJDOpen" @close="isManualJDOpen = false">
    <generic-modal
      title="Enter Job Description"
      subtitle="This will create and share a report for this candidate"
    >
      <form @submit="onSubmit">
        <hp-textarea
          label="Description"
          v-model="textareaValue"
          rows="8"
          name="description"
        ></hp-textarea>
      </form>
      <template #actions>
        <hp-button @click="onSubmit" icon="send" label="Visit report">
        </hp-button>
      </template>
    </generic-modal>
  </hp-modal>
  <df-messenger
    project-id="recruitment-profiling"
    agent-id="17a4859e-a2f5-4abb-8444-6f0546455a42"
    df-messenger-chat-background="#e89999"
    df-messenger-chat-collapse-icon-size="100px"
    language-code="en"
  >
    <df-messenger-chat-bubble
      df-messenger-chat-collapse-icon-size="12px"
      allow-fullscreen="always"
      expanded="true"
      chat-close-icon="false"
      chat-title="Profiling-Tools"
    >
    </df-messenger-chat-bubble>
  </df-messenger>
</template>
<script setup>
import { onMounted, ref } from "vue";
import GenericModal from "@/components/modals/generic-modal.vue";
import { useForm } from "vee-validate";
import HpModal from "@/components/hp-modal.vue";
import HpButton from "@/components/hp-button.vue";
import HpTextarea from "@/components/form/hp-textarea.vue";
const isManualJDOpen = ref(false);
const textareaValue = ref("dcsdc");
const { handleSubmit, isSubmitting, setFieldError, meta } = useForm({
  initialValues: {
    description: "",
  },
});
onMounted(() => {
  window.addEventListener("df-messenger-loaded", () => {
    const dfMessenger = document.querySelector("df-messenger");
    // Messenger is now ready.
    dfMessenger.renderCustomText(
        "Hello! I'm here to assist you in gathering information swiftly for the position you're looking to fill. How can I help you with the details of the job you have in mind? 😊"
      );

    // window.addEventListener("df-response-received", (event) => {
    //     console.log(" event.detail.messages", event.detail.messages);
    //     // event.detail.messages.forEach((message) => {
    //     //   if (message.type === "text") {
    //     //     message.text = `Agent says:\n\n*${message.text}*`;
    //     //   }
    //     // });
    //   });
    window.addEventListener("df-chip-clicked", (event) => {
      console.log("input", event.detail.text);
      if (event.detail.text == "Manual Job Description") {
        isManualJDOpen.value = true;
      }
    });
    window.addEventListener("df-chat-open-changed", (event) => {
      dfMessenger.startNewSession({ retainHistory: false });
      // const dfMessenger1 = document.getElementsByClassName('material-icons');
      // console.log("dfMessenger1",dfMessenger1)
      // console.log("dfMessenger1",dfMessenger1.classList)
      // document.getElementsByClassName('minimize-action').style.display = "remove";
      var elements = document.getElementsByClassName("minimize-action");
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
      // dfMessenger1[0].add.classList("remove")
      console.log(dfMessenger);
      document
        .querySelector("df-messenger")
        .shadowRoot.querySelector("df-messenger-titlebar").style.height =
        "25vh";
      dfMessenger.renderCustomText(
        "Hello! I'm here to assist you in gathering information swiftly for the position you're looking to fill. How can I help you with the details of the job you have in mind? 😊"
      );
    });
  });
});
const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  const dfMessenger = document.querySelector("df-messenger");
  // dfMessenger.renderCustomText(
  //    values.description,false
  //     );
  const queryParameters = {
    parameters: {
      job_description:"assax",
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

df-messenger {
}
</style>
