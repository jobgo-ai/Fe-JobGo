<template>
  <div class="upload">
    <div class="upload__input">
      <div class="upload__input__text">Upload File for Assistant</div>
      <hp-dropzone style="background-color: rgba(128, 128, 128, 0.1)" :isLoading="isLoading" @change="uploadFile"
        loadingLabel="File processing" label="Upload a file ">
      </hp-dropzone>
    </div>

    <div class="upload__input__text mt-5">Enter Propmt</div>
    <input type="text" class="prompt-input" v-model="prompt">


    <div v-if="summary">
      <div class="upload__input__text mt-5">Summary</div>
      <div class="meeting-summary">
        <vue-markdown :source="summary" />
      </div>
    </div>

    <button type="button" class="summary_button" @click="summarizeDiscussion">Get Summary</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import VueMarkdown from 'vue-markdown-render';
import HpDropzone from "@/components/hp-dropzone.vue";

const summary = ref('');
const resultText = ref('');
const isLoading = ref(false);
const prompt = ref('Summarize the discussion within the transcript and output the data in Markdown format.');
const apiKey = import.meta.env.VITE_File

const uploadFile = async (file) => {
  if (!file) {
    alert("Please select a file.");
    return;
  }
  const formData = new FormData();
  formData.append("pdfFile", file);

  try {
    const response = await axios.post(`${import.meta.env.VITE_Upload_URL}/fileUpload`, formData);
    resultText.value = response.data.trim();
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const summarizeDiscussion = async () => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo-0125',
      messages: [{ role: 'system', content: 'User: ' + prompt.value + resultText.value }],
      max_tokens: 150
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    summary.value = response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error summarizing discussion:', error);
  }
};
</script>

<style lang="scss" scoped>
.upload {
  @include pageContainer;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__input {
    padding: 2rem 0;
    width: 500px;

    &__text {
      text-align: center;
      margin-bottom: 1rem;
      font-weight: 600;
      @include text-h3;
    }
  }
}

.mt-5 {
  margin-top: 15px;
}

.prompt-input {
  height: 36px;
  border-radius: 7px;
  padding: 8px 8px;
  width: 500px;
}

.summary_button {
  background: #505094;
  color: white;
  padding: 7px 19px;
  border-radius: 11px;
  margin-top: 15px;
  height: 44px;
  border: 1px solid #505094;
  margin-top: 120px;
  cursor: pointer;
}

.meeting-summary {
  margin-top: 30px;
  padding: 18px;
  width: 600px;

  h1,
  h2,
  h3 {
    display: block;
    font-size: 2em;
    margin: 0.67em 0;
    font-weight: bold;
  }

  ul,
  ol {
    display: block;
    margin: 1em 0;
    padding-left: 40px;
  }

  li {
    display: list-item;
  }

  p {
    display: block;
    margin: 1em 0;
  }
}
</style>