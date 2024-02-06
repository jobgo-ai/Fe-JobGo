<template>
  <div class="upload">
<div class="upload--text">
    Upload File for Assistant
</div>
   <div class="upload--input">
    <hp-dropzone
      :isLoading="isLoading"
      @change="handleFileUpload"
      accept=".csv"
      loadingLabel="Candidates processing"
      label="Upload a csv file to add multiple candidates"
    >
    </hp-dropzone>
   </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import HpDropzone from "@/components/hp-dropzone.vue";
const isLoading = ref(false);

const csv = ref({});

const handleFileUpload = (file) => {
  csv.value = file;
};
</script>
<style lang="scss" scoped>
.upload{
    border: 1px solid red;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
&--text{
    
}
}

</style>