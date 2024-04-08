<template>


  <div v-if="showReviewNote" class="alert" style="">

    <SmileEmoji class="alert__icon" style="margin-right: 1rem;" />Please review and edit your profiling page. Once
    approved, you’ll
    receive a link of the professional multimedia job page with the next steps for matching you with the best
    candidates.
    <close @click="showReviewNote = false" style="cursor: pointer;    cursor: pointer;
    display: block;
    margin: auto;
}" />

  </div>
  <div class="container" style="background-color: white">
    <div class="presentation">
      <div class="presentation_column">
        <div class="presentation_container">
          <div class="presentation_container_title">SUPERCELL</div>
          <div class="presentation_container_title_company">
            {{ dataVal.position }}
          </div>
        </div>

        <!-- <div class="company-description">
          <div class="company-description_container">
            <h4>who we are?</h4>
            <div class="flex-center pointer" @click="editContent('company-description')">
              <EditPencil v-if="!contentEditable.companyDescription" />
              <Save v-else />
              <span class="secondary-color">{{
                !contentEditable.companyDescription ? "Edit" : "Save"
              }}</span>
            </div>
          </div>
          <div class="blue-line"></div>
          <div :class="{ 'border-2': contentEditable.companyDescription }"
            :contentEditable="contentEditable.companyDescription" class="grey-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
            earum corrupti veritatis eaque ullam aliquid vero est fugit maxime
            quis. Ratione dolores, consequuntur inventore tempora maiores itaque
            numquam eum fuga aliquid molestiae quia sint, debitis quas
            consequatur pariatur commodi expedita nemo officiis quibusdam
            placeat. Architecto eligendi dolores laborum tenetur laboriosam
            accusantium ipsum, hic odio commodi tempora blanditiis, quia soluta
            unde amet iure qui mollitia nemo nisi deleniti temporibus ipsam.
            Nesciunt, impedit laboriosam voluptates quod repellendus sequi dicta
            cumque similique atque obcaecati! Quas architecto ullam labore
            possimus amet repellat fuga eligendi reprehenderit, temporibus
            perferendis vel id odit neque facilis vitae aliquam, reiciendis
            dolores impedit, repellendus magni delectus corporis eaque eos!
            Minima dolorem nostrum ad veniam deserunt laborum culpa accusamus,
            tenetur earum! Necessitatibus velit inventore quo earum quas
            repellat maxime eius adipisci molestias impedit possimus cum magni
            vel unde qui laboriosam amet iure dolorem, debitis provident quasi
            sapiente! Dicta cumque quae id nostrum impedit, iusto atque tenetur
            laudantium labore dolorem omnis cum ipsum culpa ea recusandae
            reprehenderit, exercitationem quod, laborum amet? Laudantium soluta,
            aliquid debitis hic harum dolorem omnis, sed atque repudiandae
            reprehenderit, necessitatibus pariatur accusantium repellendus ullam
            excepturi! Blanditiis illo deserunt rem sed unde distinctio quod
            numquam voluptatum, incidunt inventore maiores quae ipsum a rerum
            excepturi assumenda vero optio sequi, pariatur, delectus dolorem?
            Perferendis, repudiandae asperiores? Nam iusto sapiente voluptatem.
            Sunt ad commodi tenetur, sequi itaque assumenda nesciunt maxime
            cupiditate similique vitae ea quisquam asperiores eligendi nostrum
            eius nam perspiciatis praesentium voluptatum consequatur laboriosam
            ullam, facilis velit! Cum odio sint ipsa?
          </div>
        </div> -->
        <div class="company-description">
          <div class="company-description_container">
            <h4>Take your career into top gear</h4>
            <div class="flex-center pointer" @click="editContent('job-description')">
              <EditPencil v-if="!contentEditable.jobDescription" />
              <Save v-else />
              <span class="secondary-color description">{{
                !contentEditable.jobDescription ? "Edit" : "Save"
              }}</span>
            </div>
          </div>
          <div class="blue-line"></div>
          <div :class="{ 'border-2': contentEditable.jobDescription }" :contentEditable="contentEditable.jobDescription"
            class="grey-text job-description">
            {{ dataVal.description }}
          </div>
        </div>
        <div class="company-description">
          <div class="company-description_container">
            <h4>Key Responsibilites</h4>
            <div class="flex-center pointer" @click="editContent('key-responsabilities')">
              <EditPencil v-if="!contentEditable.keyResponsabilities" />
              <Save v-else />
              <span class="secondary-color ">{{
                !contentEditable.keyResponsabilities ? "Edit" : "Save"
              }}</span>
            </div>
          </div>
          <div class="blue-line"></div>
          <div :class="{ 'border-2': contentEditable.keyResponsabilities }"
            :contentEditable="contentEditable.keyResponsabilities" class="grey-text">
            <ul class="responsibilities content_editable_true">
              <li v-for="(item, index) of dataVal.key_responsibilities" :index="index"
                style="display: flex; margin-bottom: 10px">
                <div style="width: 16px">
                  <ArrowRight />
                </div>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="company-description">
          <div class="company-description_container">
            <h4>Skill and Qualification</h4>
            <div class="flex-center pointer" @click="editContent('skill-qualification')">
              <EditPencil v-if="!contentEditable.skilQualification" />
              <Save v-else />
              <span class="secondary-color skill_qualification">{{
                !contentEditable.skilQualification ? "Edit" : "Save"
              }}</span>
            </div>
          </div>
          <div class="blue-line"></div>
          <div :class="{ 'border-2': contentEditable.skilQualification }"
            :contentEditable="contentEditable.skilQualification" class="grey-text">
            <ul class="skill_qualification content_editable_true">
              <li v-for="(skill, index) of dataVal.skill_qualifcation" :index="index"
                style="display: flex; margin-bottom: 10px">
                <div style="width: 16px">
                  <ArrowRight />
                </div>
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
        <div class="company-description">
          <div class="company-description_container">
            <h4>What we offer</h4>
            <div class="flex-center pointer" @click="editContent('what-we-offer')">
              <EditPencil v-if="!contentEditable.what_we_offer" />
              <Save v-else />
              <span class="secondary-color">{{
                !contentEditable.what_we_offer ? "Edit" : "Save"
              }}</span>
            </div>
          </div>
          <div class="blue-line"></div>
          <div :class="{ 'border-2': contentEditable.what_we_offer }" :contentEditable="contentEditable.what_we_offer"
            class="grey-text what_we_offer content_editable_true">
            {{ dataVal.what_we_offer }}
          </div>
        </div>
          <div>
        </div>



        <div class="company-description">
          <div class="company-description_container">
            <h4>Pre screening questions</h4>
            <div class="flex-center pointer" @click="editContent('pre-screening-question')">
              <EditPencil v-if="!contentEditable.pre_screening_question" />
              <Save v-else />
              <span class="secondary-color">{{
                !contentEditable.pre_screening_question ? "Edit" : "Save"
              }}</span>
            </div>
          </div>
          <div class="blue-line"></div>
          <div :class="{ 'border-2': contentEditable.pre_screening_question }" class="grey-text"
            :contentEditable="contentEditable.pre_screening_question">
            <ul class=" content_editable_true pre-screening-question">
              <li v-for="(quesion, index) of dataVal.pre_screeing_question" :index="index"
                style="display: flex; margin-bottom: 10px">
                <div style="width: 16px">
                  <ArrowRight />
                </div>
                {{ quesion }}
              </li>
            </ul>
          </div>
        </div>

        <button @click="approveContent" class="job__container_button" style="width: 100%;">Approve</button>
      </div>

      <div class="job">
        <div class="job__overview">
          <div>Job Overview</div>
        </div>
        <div class="job__container">
          <img class="job_company_logo"
            src="https://asset.brandfetch.io/idk2l-po7q/idMcXneL6D.svg?updated=1668075277199" alt="" />

          <div class="job__container__details">
            <div>
              <div style="display: flex;margin:1.2rem 0">
                <div style="width:16;height: 16px;margin-right: 10px;">
                  <PostionIcon />

                </div>
                <div>
                  <div class="job__container__details__title">Position </div>
                  <div :class="[contentEditable.jobOverview ? 'border-2' : '']"
                    class="job__container__details__subtitle position" :contentEditable="contentEditable.jobOverview" style="
">{{ dataVal.position }}</div>
                </div>
              </div>
              <div style="display: flex;margin:1.2rem 0">
                <div style="width:16;height: 16px;margin-right: 10px;">
                  <Star />

                </div>
                <div>
                  <div class="job__container__details__title">Experience </div>
                  <div :class="[contentEditable.jobOverview ? 'border-2' : '']"
                    class="job__container__details__subtitle experience" :contentEditable="contentEditable.jobOverview" style="
">{{ dataVal.experience }}</div>
                </div>
              </div>
              <div style="display: flex;margin:1.2rem 0">
                <div style="width:16;height: 16px;margin-right: 10px;">
                  <Salary />

                </div>
                <div>
                  <div class="job__container__details__title">Salary </div>
                  <div :class="[contentEditable.jobOverview ? 'border-2' : '']"
                    class="job__container__details__subtitle salary" :contentEditable="contentEditable.jobOverview" style="
">{{ dataVal.salary }}</div>
                </div>
              </div>
              <!-- <div style="display: flex;margin:1.2rem 0">
                <div style="width:16;height: 16px;margin-right: 10px;">
                  <Industry/>

                </div>
                <div>
                  <div class="job__container__details__title">Industry </div>
                   <div :class="[contentEditable.jobOverview  ? 'border-2' : '']" class="job__container__details__subtitle"
                    :contentEditable="contentEditable.jobOverview" style="
">{{dataVal.company_industry}}</div>
                </div>
              </div> -->
              <div style="display: flex;margin:1.2rem 0">
                <div style="width:16;height: 16px;margin-right: 10px;">
                  <Hyrbird />

                </div>
                <div>
                  <div class="job__container__details__title">Location </div>
                  <div :class="[contentEditable.jobOverview ? 'border-2' : '']"
                    class="job__container__details__subtitle location"  :contentEditable="contentEditable.jobOverview" style="
">{{ dataVal.location }}</div>
                </div>
              </div>
              <div style="display: flex;margin:1.2rem 0">
                <div style="width:16;height: 16px;margin-right: 10px;">
                  <LastEdit />

                </div>
                <div>
                  <div class="job__container__details__title last-edit">Last Edit </div>
                  <div :class="[contentEditable.jobOverview ? 'border-2' : '']"
                    class="job__container__details__subtitle" :contentEditable="contentEditable.jobOverview" style="
">{{ dataVal.last_edit }}</div>
                </div>
              </div>

            </div>

          </div>

          <button @click="editContent('job-overview')" class="job__container_button">{{ !contentEditable.jobOverview ?
            "Edit" : "Save" }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
//vendor
import { ref, onMounted } from "vue";
import { useGet, usePut } from "@/composables/useHttp";
import { useRoute } from "vue-router";
import EditPencil from "@/assets/icons/edit-pencil.svg";
import Save from "@/assets/icons/save.svg";
import ArrowRight from "@/assets/icons/path.svg";
import SmileEmoji from "@/assets/icons/smile-emoji.svg";
import PostionIcon from "@/assets/icons/postion-icon.svg";
import StarIcon from "@/assets/icons/star1.svg";
import Salary from "@/assets/icons/Salary.svg";
import Industry from "@/assets/icons/Industry.svg";
import LastEdit from "@/assets/icons/last-visited.svg";
import Star from "@/assets/icons/star.svg";
import Hyrbird from "@/assets/icons/hybrid.svg";
import close from "@/assets/icons/close.svg";

//state
const contentEditable = ref({
  companyDescription: false,
  jobDescription: false,
  keyResponsabilities: false,
  skilQualification: false,
  what_we_offer: false,
  pre_screening_question: false,
  jobOverview: false,
});
const showReviewNote = ref(true)
const jobOveriew = ref([{
  title: "Position",
  subTitle: "Position",
}, {
  title: "Experience",
  subTitle: "+4 years Experience",
}, {
  title: "Salary",
  subTitle: "6000 $",
}, {
  title: "Company Industry",
  subTitle: "Software development ",
}, {
  title: "Hyrbird",
  subTitle: "Korkeavourenkatu 2f, 00140, Helsinki",
}, {
  title: "Last Edit",
  subTitle: "10  days ago",
}])
const dataVal = ref({
  description: ` We are looking for a Lead UI Designer to join our team. The location can be set either in our
                        Tampere or
                        Helsinki office. Purpose of the role Main role is to create user interfaces based on the (UX)
                        wireframes
                        Validation of user experience (UX) wireframes Make sure that 3 Step IT’s web services have
                        uniform
                        feeling / look-a-like Main accountabilities & tasks To design user interfaces
                        We are looking for a Lead UI Designer to join our team. The location can be set either in our
                        Tampere or
                        Helsinki office. Purpose of the role Main role is to create user interfaces based on the (UX)
                        wireframes
                        Validation of user experience (UX) wireframes Make sure that 3 Step IT’s web services have
                        uniform
                        feeling / look-a-like Main accountabilities & tasks To design user interfaces`,
  responsibilities: `     We are looking for a Lead UI Designer to join our team. The location can be set either in our
                        Tampere or Helsinki office. Purpose of the role Main role is to create user interfaces based on
                        the (UX) wireframes Validation of user experience (UX) wireframes.

                        We are looking for a Lead UI Designer to join our team. The location can be set either in our
                        Tampere or
                        Helsinki office. Purpose of the role Main role is to create user interfaces based on the (UX)
                        wireframes
                        Validation of user experience (UX) wireframes Make sure that 3 Step IT’s web services have
                        uniform
                        feeling / look-a-like Main accountabilities & tasks To design user interfaces
                        We are looking for a Lead UI Designer to join our team. The location can be set either in our
                        Tampere or
                        Helsinki office. Purpose of the role Main role is to create user interfaces based on the (UX)
                        wireframes
                        Validation of user experience (UX) wireframes Make sure that 3 Step IT’s web services have
                        uniform
                        feeling / look-a-like Main accountabilities & tasks To design user interfaces`,
  education: "Bachelor's degree in Computer Science",
  qualification: `    We are looking for a Lead UI Designer to join our team. The location
            can be set either in our Tampere or Helsinki office. Purpose of the
            role Main role is to create user interfaces based on the (UX)
            wireframes Validation of user experience (UX) wireframes Make sure
            that 3 Step IT’s web services have uniform feeling / look-a-like
            Main accountabilities & tasks To design user interfaces We are
            looking for a Lead UI Designer to join our team. The location can be
            set either in our Tampere or Helsinki office. Purpose of the role
            Main role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces We are looking
            for a Lead UI Designer to join our team. The location can be set
            either in our Tampere or Helsinki office. Purpose of the role Main
            role is to create user interfaces based on the (UX) wireframes
            Validation of user experience (UX) wireframes Make sure that 3 Step
            IT’s web services have uniform feeling / look-a-like Main
            accountabilities & tasks To design user interfaces`,
  how_to_apply: `Praesent sapien massa, convallis a pellentesque nec, egestas non
            nisi. Curabitur aliquet quam id dui posuere blandit. Curabitur
            aliquet quam id dui posuere blandit. Curabitur non nulla sit amet
            nisl tempus convallis quis ac lectus navid.nosrati@jobgo.com.`,
  experience: "2+ Years Exprience",
  salary: "4500 €",
  position: "Lead UX/UI Designer",
  last_edit: "2 Days Ago",
  company_industry: "Computer Application",
  location: "Korkeavourenkatu 2f, 00140, Helsinki",
  key_responsibilities: [
    "Designing and implementing user-friendly and responsive UI components using Vue.js framework.",
    "Ensuring the UI/UX designs are faithfully implemented and optimized for performance.",
    "Utilizing Vuex for managing application state, including data persistence, sharing state across components, and handling complex state transitions.",
    "Integrating Vue.js applications with backend APIs or services using technologies like Axios or Fetch for data retrieval and manipulation.",
    "Implementing client-side routing using Vue Router to create a seamless, single-page application (SPA) experience."],
  skill_qualifcation: [
    "Java",
    "Python",
    "C++",
    "SQL",
    "API Development"
  ],
  what_we_offer: "At our organization, we provide an array of benefits aimed at fostering a fulfilling work experience. These include comprehensive health insurance coverage to ensure the well-being of our employees. Additionally, we offer unlimited coffee to keep our team energized and motivated throughout the day. ",
  pre_screeing_question: [
    "What is your motivation for this position?",
    "What is your salary expectation?",
    "What is your notice period?",
    "What programming languages are you proficient in?",
    "Have you worked with any specific backend frameworks or technologies?"
  ]
});
const route = useRoute();
//hooks
onMounted(async () => {
  await getJobProfile()
});
//methods

const editContent1 = () => {

  let responsibiltes = []
  let skill_qualifcation = []
  let what_we_offer = []
  let preScreeingQuestion = []

  var editableElements = document.querySelectorAll('.content_editable_true');
  editableElements.forEach(function (element, index) {
    // Access each editable element here
    // For example, you can get its text content
  if (element.classList.contains('responsibilities')) {
      const liElements = element.getElementsByTagName('li')
      for (let i = 0; i < liElements.length; i++) {
        // Push the text content of the current <li> element into the array
        responsibiltes.push(liElements[i].textContent);
      }
    } else if (element.classList.contains('skill_qualification')) {
      let liElements = element.getElementsByTagName('li')
      for (let i = 0; i < liElements.length; i++) {
        // Push the text content of the current <li> element into the array
          skill_qualifcation.push(liElements[i].textContent);
      }
    } 
    else if (element.classList.contains('pre-screening-question')) {
      let liElements = element.getElementsByTagName('li')
      for (let i = 0; i < liElements.length; i++) {
        // Push the text content of the current <li> element into the array
          preScreeingQuestion.push(liElements[i].textContent);
      }
    } 
  });
  return {responsibiltes,skill_qualifcation,what_we_offer,preScreeingQuestion}
}
const editContent2 = async (event) => {
  const description1 = document.querySelector('.description').textContent;
  const responsibilities1 = document.querySelector('.responsibilities').textContent;
  console.log("responsibilities1", document.querySelector('.responsibilities').textContent)
  // const skill_qualification =document.querySelector('.skill_qualification').textContent;
  // const location1 =location.value.textContent;
  // const position1 =position.value.textContent;
  // const salary1 =salary.value.textContent;
  // const education1 =education.value.textContent;
  // const experience1 =experience.value.textContent;
  // const putOpening = usePut(`self/profile`);
  const   {responsibiltes,skill_qualifcation,what_we_offer,preScreeingQuestion}=editContent1()
  await putOpening.put({
    id: route.query?.jobId,
    jobPosition:position1,
    experience: experience1,
    location:location1,
    salary: salary1,
    education:education1,
    fullDescription: description1
  });
  // await getJobProfile()
};
const getJobProfile = (async () => {
  const id = route.query?.jobId;
  if (id) {
    const { data, get } = useGet(`self/profile/${id}`);
    await get();
    dataVal.value.description = data.value?.fullDescription;
    dataVal.value.qualification = data.value?.qualification;
    dataVal.value.experience = data.value?.experience;
    dataVal.value.salary = data.value?.salary;
    dataVal.value.position = data.value?.jobPosition;
    dataVal.value.location = data.value?.location;
    dataVal.value.education = data.value?.education;
  }
})
const editContent = async (section) => {
  const   {responsibiltes,skill_qualifcation,what_we_offer,preScreeingQuestion}=editContent1()
  const putOpening = usePut(`self/profile`);
  await putOpening.put({
    id: route.query?.jobId,
    jobPosition:document.querySelector(".position").textContent,
    experience: document.querySelector(".experience").textContent,
    location: document.querySelector(".location").textContent,
    salary:  document.querySelector(".salary").textContent,
    fullDescription:   document.querySelector(".job-description").textContent,
  });
  const sectionMap = {
  "company-description": "companyDescription",
  "job-description": "jobDescription",
  "key-responsabilities": "keyResponsabilities",
  "job-overview": "jobOverview",
  "skill-qualification": "skilQualification",
  "what-we-offer": "what_we_offer",
  "pre-screening-question": "pre_screening_question"
};
console.log(section)
if (sectionMap.hasOwnProperty(section)) {
  contentEditable.value[sectionMap[section]] = !contentEditable.value[sectionMap[section]];
}
};
const approveContent = () => {
  console.log("approveContent")
}
</script>
<style lang="scss" scoped>
.presentation {
  color: black;
  background-color: white;
  padding: 6rem 0 0 0;
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-between;

  &_column {
    width: 60%;

    &__title {
      color: #2c3547;
      margin-top: 1rem;
    }
  }
}

.presentation_container {
  &_title {
    font-family: Roboto;
    font-size: 32px;
    color: #1184d6;
    font-weight: 500;
    letter-spacing: 0.6285715103149414px;
    text-align: left;

    &_company {
      font-family: Roboto;
      font-size: 20px;
      // margin: 12px 0;
      font-weight: 500;
      line-height: 23.44px;
      letter-spacing: 0.6285715103149414px;
      text-align: left;
    }
  }


}

.company-description {
  margin-top: 2rem;
  margin-bottom: 2rem;

  &_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h4 {
    color: #2C3547;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 600;
    line-height: 23.44px;
    letter-spacing: 0.6285715103149414px;
    text-align: left;
  }
}

.blue-line {
  width: 40px;
  height: 1px;
  margin: 1.5rem 0;
  background-color: #1184d6;
}

.secondary-color {
  color: #1184d6;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-description {
  [contenteditable] {
    border-radius: 1rem;

    outline: 1px solid transparent;
    border: 1px solid transparent;
    // border: 0px solid #0000003B
  }
}

.job {
  [contenteditable] {
    border-radius: 1rem;
    padding: 0.5rem !important;
    outline: 1px solid transparent;
    border: 1px solid transparent;
    // border: 0px solid #0000003B
  }
}

.border-2 {
  outline: 1px solid rgb(206, 206, 206, 0.7);
  border: 1px solid rgb(188, 188, 188, 0.7);
  background-color: #F5F5F5;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.006em;
  text-align: left;
  padding: 1rem;
}

.job {
  &_company_logo {
    width: 160.37px;
    height: 159px;
    top: 101px;
    left: 114px;
    gap: 0px;
    opacity: 0px;
    display: block;
    margin: 0 auto;
  }

  &__container {
    border-left: 1px solid rgb(212, 212, 212);
    border-right: 1px solid rgb(212, 212, 212);
    border-bottom: 1px solid rgb(212, 212, 212);

    &_button {
      background-color: #1184d6;
      color: white;
      padding: 1rem 2rem;
      width: 322.75px;
      opacity: 0px;
      background: rgba(29, 174, 255, 1);
      border: none;
      margin: 1rem auto;
      border-radius: 0.5rem;
      display: block;
    }

    &__details {
      border-top: 1px solid rgb(212, 212, 212);
      padding: 1.5rem;

      &__title {
        font-family: Roboto;
        font-size: 16px;
        font-weight: 700;
        line-height: 18.75px;
        letter-spacing: 0.10181818157434464px;
        text-align: left;
        color: rgba(44, 53, 71, 1);
        margin-top: 2px;
      }

      &__subtitle {
        font-family: Roboto;

        font-size: 16px;
        font-weight: 400;
        line-height: 18.75px;
        letter-spacing: 0.10181818157434464px;
        text-align: left;
        color: rgba(121, 121, 121, 1);
        width: 300.3px;
        margin-top: 4px
      }
    }

  }

  &__overview {
    width: 387.3px;
    height: 53px;
    gap: 0px;
    opacity: 0px;
    background-color: #1184d6;
    color: white;

    div {
      padding: 15px;
    }
  }
}

button {
  cursor: pointer;
}

.grey-text {
  color: #797979;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.440000057220459px;
  text-align: left;

}

.alert {
  background: #02223B;
  color: white;
  padding: 1rem 5rem;
  width: 100vw;
  background-color: white;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 1280px) {

  /* Add styles specific to screens 1028px and above here */
  /* For example: */
  .presentation {
    display: flex;
    flex-direction: column-reverse;

    &_column {
      width: 100%;
    }
  }

  .job__container_button {
    width: 100%;
    padding: 0.5rem 1rem;
  }

  .job {
    &__conatiner {
      &_button {}
    }

    &__overview {
      width: 100%;
    }
  }

  .alert {
    background: #02223B;
    font-size: 0.5rem;

    color: white;
    padding: 1rem 1rem;
    width: 100vw;
    display: flex;
    align-items: center;

    &__icon {
      display: none
    }
  }

}

.alert {
  background: #02223B;
  color: white;
  padding: 1rem 5rem;
  width: 100vw;
  display: flex;
  align-items: center;

}
</style>
