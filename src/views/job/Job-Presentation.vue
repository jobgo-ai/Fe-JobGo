<template>
  <div class="job-details">
    <div style="display: flex; justify-content: space-between; width: 100%">
      <div placeholder="title" contenteditable="true" class="job-details__name">
        {{ sessionParameter.opening_name }}45
      </div>
    </div>
    <div
      placeholder="experience"
      id="editor"
      contenteditable="true"
      class="job-details__experience"
      style=""
      spellcheck="true"
      data-content-editable-leaf="true"
    >
      3+ Year
    </div>
    <div ref="dropdownTarget" >
    <div
      v-if="showJobDescription"
      placeholder="job description"
      v-html="editorData"
      @click="changeVisibility"
      class="job-details__description"
    ></div>
   <div     style="margin-top:2.4rem" v-else>
    <CKEditor

    :editor="ClassicEditor"
    v-model="editorData"
    :config="editorConfig"
  ></CKEditor>
   </div>
  </div>
  </div>
</template>
<script setup>
import { ref, onMounted,nextTick  } from "vue";
// import markdownToeditorData from "markdown-to-editorData";
import { marked } from "marked";
import { onClickOutside } from "@vueuse/core";
import { component as CKEditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const editorData = ref("<h1>Content of the editor.</h1>");
const showJobDescription=ref(true)
const dropdownTarget=ref("")
const changeVisibility=()=>{
  showJobDescription.value=!showJobDescription.value
}
onClickOutside(dropdownTarget,async (event) => {
  await nextTick(()=>{
    changeVisibility()
  })
});
const editorConfig = ref({
  toolbar: ["heading", "bold", "italic", "numberedList"],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
    ],
  },
});
const markdown = ref(
  "**Job Title:** React.js Developer (Remote)\n" +
    "\n" +
    "**Department:** Software Development\n" +
    "\n" +
    "**Reports To:** Software Development Manager\n" +
    "\n" +
    "**Summary:**\n" +
    "\n" +
    "We are seeking an experienced React.js Developer to join our remote team. The ideal candidate will have a strong understanding of React.js principles and best practices, as well as a passion for building innovative web applications. The successful candidate will work closely with other engineers to design, develop, and maintain React.js applications for our clients.\n" +
    "\n" +
    "**Responsibilities:**\n" +
    "\n" +
    "* Develop React.js applications using best practices and industry standards\n" +
    "* Work with designers and product managers to gather requirements and translate them into technical designs\n" +
    "* Implement React.js components and modules using ES6, JSX, and other modern JavaScript techniques\n" +
    "* Integrate React.js applications with backend services and APIs\n" +
    "* Perform unit testing and debugging of React.js applications\n" +
    "* Collaborate with other engineers to design and implement scalable and maintainable codebases\n" +
    "* FollowAgile development processes and methodologies\n" +
    "* Keep up-to-date on the latest React.js trends and technologies\n" +
    "\n" +
    "**Qualifications:**\n" +
    "\n" +
    "* Minimum 3+ years of experience in software development\n" +
    "* Strong understanding of React.js principles and best practices\n" +
    "* Proficient in ES6, JSX, and other modern JavaScript techniques\n" +
    "* Experience with Flux or Redux state management\n" +
    "* Experience integrating React.js applications with backend services and APIs\n" +
    "* Strong unit testing and debugging skills\n" +
    "* Experience with Agile development processes and methodologies\n" +
    "* Excellent communication and teamwork skills\n" +
    "* Bachelor's or Master's degree in Computer Science, Software Engineering, or related field\n" +
    "\n" +
    "**Benefits:**\n" +
    "\n" +
    "* Competitive salary and benefits package\n" +
    "* Opportunity to work on challenging and innovative projects\n" +
    "* Remote work arrangement with flexible working hours\n" +
    "* Supportive and collaborative work environment\n" +
    "\n" +
    "**To Apply:**\n" +
    "\n" +
    "Please submit your resume and a cover letter highlighting your relevant skills and experience to [email protected]\n" +
    "\n" +
    "**Additional Information:**\n" +
    "\n" +
    "This position is open to candidates located in the United States only.\n" +
    "\n" +
    "We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status."
);
const sessionParameter = {
  opening_name: " Full Stack Developer",
  job_location: "Remote",
};

onMounted(() => {
  // editorData.value = markdownToeditorData(markdown.value); // "Some quoted *code*"
  editorData.value = marked.parse(markdown.value);
  console.log(editorData.value);
  document.addEventListener("contextmenu", function (e) {
    // Disable right-click
    e.preventDefault();
  });

  document.addEventListener("copy", function (e) {
    // Disable copy
    e.preventDefault();
  });

  document.addEventListener("cut", function (e) {
    // Disable cut
    e.preventDefault();
  });

  document.addEventListener("paste", function (e) {
    // Disable paste
    e.preventDefault();
  });
  // const jobDetailsName = document.getElementsByClassName("job-details__name");
  // const jobDetailsExperience = document.getElementsByClassName(
  //   "job-details__experience "
  // );
  // const jobDetailsDescription = document.getElementsByClassName(
  //   "job-details__description"
  // );
  // jobDetailsName.addEventListener(
  //   "input",
  //   function (event) {
  //     console.log("input event fired", editor.innerText || editor.textContent);
  //   },
  //   false
  // );
});
</script>
<style lang="scss" scoped>
.job-details {
  padding: 4rem;
  // -webkit-user-select: none;
  // -webkit-touch-callout: none;
  // -moz-user-select: none;
  // -ms-user-select: none;
  // user-select: none;
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  // background-color: #f0f0e7;
  min-height: 100vh;
  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin: 0;
  }

  input {
    width: 500px !important;
    font-size: 24px;
    font-weight: 600;
    outline: none;
    border: 2px dotted grey;
    line-height: 32px;
    padding-right: 1rem;
    margin: 0;
  }
  &__name {
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;
    border-radius: 5px;
  }
  &__experience {
    font-size: 20px;
    cursor: pointer;
    margin-top: 2rem;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    font-weight: 500;
  }
  &__description {
    font-size: 1rem;
    margin-top: 2rem;
    outline: none;
    font-weight: 500;
  }
}
div p:focus {
  background: #fff;
  border-color: #4ae459;
}
:focus {
  outline: none;
  border: none;
}
[contenteditable] {
  // -webkit-tap-highlight-color: transparent;
}
.job-details__name[placeholder]:empty:before {
  content: attr(placeholder);
  color: #555;
}

.ck.ck-content h3.category {
    font-family: 'Bebas Neue';
    font-size: 20px;
    font-weight: bold;
    color: #d1d1d1;
    letter-spacing: 10px;
    margin: 0;
    padding: 0;
}

.ck.ck-content p.info-box {
    padding: 1.2em 2em;
    border: 1px solid #e91e63;
    border-left: 10px solid #e91e63;
    border-radius: 5px;
    margin: 1.5em;
}
.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  padding: 1rem !important;
}

.ck.ck-content h3.category {
    font-family: 'Bebas Neue';
    font-size: 20px;
    font-weight: bold;
    color: #d1d1d1;
    letter-spacing: 10px;
    margin: 0;
    padding: 0;
}

.ck.ck-content p.info-box {
    padding: 1.2em 2em;
    border: 1px solid #e91e63;
    border-left: 10px solid #e91e63;
    border-radius: 5px;
    margin: 1.5em;
}

</style>
