<template>
  <div class="signin">
    <div class="signin__logo">
      <Logo />
    </div>
    <div class="signin__container signin__container_prompt">
      <div class="signin__section">
        <div class="signin__image-container"></div>
        <!-- <p class="signin__subtitle">Welcome back!</p> -->
        <h2 class="signin__title">Play with Prompt</h2>
        <form @submit="onSubmit">
          <!-- <hp-textArea name="prompt" placeholder="Enter your prompt" label="Prompt" :autofocus="true" type="text"
            rows="15" col="50" /> -->

          <hp-textArea name="prompt" placeholder="Enter your prompt" label="Prompt" :autofocus="true" type="text"
            rows="20"/>

          <hp-button primary fullWidth :isDisabled="isLoading" type="submit"
            :label="(isLoading) ? 'Loading...' : 'Save'"></hp-button>
        </form>
        <!-- <div class="signup__section__or">OR</div> -->
      </div>
      <!-- <div class="signup__section">
        <hp-google-auth />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import HpTextArea from "@/components/form/hp-textarea.vue";
import HpButton from "@/components/hp-button.vue";
import { useGet, usePut, usePost } from "@/composables/useHttp";
import useToast from "@/composables/useToast";
import Logo from "@/assets/logo.svg";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const { handleSubmit, isSubmitting, setFieldError, meta, resetForm } = useForm({
  initialValues: {
    prompt: "",
  },
});
const { setToast } = useToast();
const isLoading = ref(false);
onMounted(() => {
  getPrompt();
});
const getPrompt = async () => {

  isLoading.value = true;
  console.log("Get prompt :- ", localStorage.getItem("prompt-design"));
  // const newPrompt = localStorage.getItem("prompt-design");

  // prompt.value = newPrompt;
  // resetForm({
  //   values: {
  //     prompt: prompt.value,
  //   },
  // });

  const getPromptAPI = useGet(`getPrompt`);
  await getPromptAPI.get();
  const newPrompt = getPromptAPI?.data?.value?.instruction

  prompt.value = newPrompt;
  resetForm({
    values: {
      prompt: prompt.value,
    },
  });

  isLoading.value = false;
};
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const { prompt } = values;

  console.log("Prompt :- ", prompt);
  const { post, data, loading } = usePost("updatePrompt");
  await post({
    prompt: prompt
  });

  localStorage.setItem("prompt-design", data?.value);
  console.log("updatePrompt", data);

  getPrompt();

  setToast({
    type: "positive",
    title: "Success!",
    message: "Prompt is Update Successfully",
  });

  router.push({ path: "/chat"});


  isLoading.value = false;
});
</script>

<style lang="scss">
.signin {
  display: flex;
  flex-direction: column;
  padding: 24px;

  &__section {
    padding-bottom: 24px;
    position: relative;
  }

  &__subtitle {
    @include text-h3;
    font-weight: 500;
    color: var(--color-text-secondary);
  }

  &__title {
    @include text-h3;
    font-weight: 500;
    margin-bottom: 24px;
  }

  &__logo {
    margin: auto;
    margin-bottom: 48px;
    height: 48px;
    width: 48px;
  }

  &__container {
    margin: auto;
    padding: 24px;
    width: 100%;
    border: $border;
    border-radius: $border-radius-md;
    background-color: var(--color-background);
    position: relative;
    box-shadow: $box-shadow;
  }

  &__image-container {
    display: flex;
    background-image: url("../../assets/abstracts/decorations/illustration.svg");
    position: absolute;
    top: 50%;
    height: 100%;
    width: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: $z-index-negative;
  }

  &__password-container {
    position: relative;
  }
}

@media (min-width: $breakpoint-tablet) {
  .signin {
    padding: 0;

    &__container {
      width: 450px;
    }

    &__logo {
      margin-top: 64px;
    }

    &__image-container {
      height: 446px;
      width: 588px;
    }
  }
}

.signin__container_prompt {
  width: 80% !important;
}
</style>
