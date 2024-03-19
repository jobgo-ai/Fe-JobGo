<template>
  <div class="presentation">
    <div class="presentation_container">
      <div class="header_container">
        <div class="nav active">Job</div>
        <div class="nav">Company</div>
        <div class="nav">People</div>
      </div>
      <div class="body-container">
        <div class="sections">
          <div class="title">Description</div>
          <div class="line">
            <div class="small"></div>
            <div class="big"></div>
          </div>
          <div class="description">
            We are looking for a Lead UI Designer to join our team. The location
            can be set either in our
            {{ data.description }}
          </div>
        </div>
        <div class="sections">
          <div class="title">Responsibilities</div>
          <div class="line">
            <div class="small"></div>
            <div class="big"></div>
          </div>
          <div class="description">
       {{data.responsibilities}}
            <!-- <div>Build next-generation web applications with a focus on the client side.</div> -->
          </div>
        </div>
        <div class="sections">
          <div class="title">Qualification</div>
          <div class="line">
            <div class="small"></div>
            <div class="big"></div>
          </div>
          <div class="description">
       {{data.qualification}}
        
            <div>Good visual design skills</div>
          </div>
        </div>
        <div class="sections">
          <div class="title">How to Apply</div>
          <div class="line">
            <div class="small"></div>
            <div class="big"></div>
          </div>
          <div class="description">
            {{ data.how_to_apply }}
          </div>
        </div>
      </div>
    </div>
    <div class="info_container">
      <div class="title_container">Job Overview</div>
      <div class="summary_container">
        <div class="logo">
          <div>
            <img class="company_logo" src="../../assets/company_logo.jpeg" />
          </div>
          <div class="company">Wooly Ltd</div>
          <div class="share">
            <div class="share-button"><img src="../../assets/share.png" /></div>
            <div class="type">Full-Time</div>
          </div>
        </div>
        <div class="job-summary">
          <div class="section">
            <div class="flex">
              <div class="icon"><img src="../../assets/calander.png" /></div>
              <div class="label">Date Posted:</div>
            </div>
            <div class="value">10 days ago</div>
          </div>
          <div class="section">
            <div class="flex">
              <div class="icon"><img src="../../assets/location.png" /></div>
              <div class="label">Location:</div>
            </div>
            <div class="value">Korkeavourenkatu 2f, 00140, Helsinki</div>
          </div>
          <div class="section">
            <div class="flex">
              <div class="icon"><img src="../../assets/company.png" /></div>
              <div class="label">Company Industry:</div>
            </div>
            <div class="value">Finance</div>
          </div>
          <div class="section">
            <div class="flex">
              <div class="icon"><img src="../../assets/position.png" /></div>
              <div class="label">Position:</div>
            </div>
            <div class="value">Lead UX/UI Designer</div>
          </div>
          <div class="section">
            <div class="flex">
              <div class="icon"><img src="../../assets/salary.png" /></div>
              <div class="label">Salary:</div>
            </div>
            <div class="value">4500 €</div>
          </div>
          <div class="section">
            <div class="flex">
              <div class="icon"><img src="../../assets/calander.png" /></div>
              <div class="label">Exprience:</div>
            </div>
            <div class="value">2+ Years Exprience</div>
          </div>
          <div class="apply-now">Apply Now</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const data = ref({
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

                        qualification:`    We are looking for a Lead UI Designer to join our team. The location
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
            how_to_apply:`Praesent sapien massa, convallis a pellentesque nec, egestas non
            nisi. Curabitur aliquet quam id dui posuere blandit. Curabitur
            aliquet quam id dui posuere blandit. Curabitur non nulla sit amet
            nisl tempus convallis quis ac lectus navid.nosrati@jobgo.com.`
});
</script>
<style>
.presentation {
  background-color: #dde3e8;
  display: flex;
}

.presentation .presentation_container {
  background-color: white;
  /* height: 100vh; */
  color: black;
  margin-left: 50px;
  margin-right: 10px;
  width: 70%;
}

.presentation_container .header_container {
  padding-top: 15px;
  padding-bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  border-bottom: 1px solid #dde3e8;
}

.header_container .nav {
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  color: #b2b9c9;
}

.header_container .nav.active {
  border-bottom: 3px solid #29abe2;
  color: #2c3547;
}

.presentation_container .body-container {
  padding: 0px 46px;
}

.body-container .sections {
  padding: 22px 0px;
}

.body-container .sections .title {
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  color: #2c3547;
}

.body-container .sections .description {
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: #797979;
  margin-top: 15px;
}

.body-container .sections .line {
  padding: 15px 0px;
  display: flex;
}

.body-container .sections .line .small {
  width: 15px;
  height: 1px;
  background-color: #29abe2;
  margin-right: 10px;
}

.body-container .sections .line .big {
  width: 45px;
  height: 1px;
  background-color: #29abe2;
}

.info_container {
  width: 30%;
  background: white;
  color: black;
  margin-left: 10px;
  margin-right: 50px;
  height: max-content;
}

.info_container .title_container {
  background-color: #29abe2;
  display: flex;
  align-items: center;
  padding: 16px 25px;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: white;
}

/* .info_container .summary_container {
    padding: 16px 25px;
} */

.summary_container .logo {
  border-bottom: 1px solid #dde3e8;
  padding: 16px 25px;
}

.summary_container .logo div {
  display: flex;
  justify-content: center;
}

.summary_container .logo .company_logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.summary_container .logo .company {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #2c3547;
}

.summary_container .logo .share {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.summary_container .logo .share .share-button {
  border: 1px solid #dde3e8;
  padding: 3px;
  border-radius: 4px;
  cursor: pointer;
}

.summary_container .logo .share .type {
  background-color: #d4f8f0;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  padding: 7px 16px;
  margin-left: 10px;
}

.summary_container .job-summary {
  padding: 16px 25px;
  border-bottom: 2px solid #29abe2;
}

.job-summary .section {
  margin-top: 30px;
}

.job-summary .section .label {
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  color: #2c3547;
  margin-left: 15px;
}

.job-summary .section .value {
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #797979;
  margin-top: 10px;
}

.job-summary .apply-now {
  background-color: #f36969;
  color: white;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  border-radius: 4px;
}

.flex {
  display: flex;
}
</style>
