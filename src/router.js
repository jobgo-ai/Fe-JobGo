import { createRouter, createWebHistory } from "vue-router";

// Public
import ForgotPassword from "@/views/public/forgot-password.vue";
import NotFound from "@/views/public/not-found.vue";
import Verify from "@/views/public/verify.vue";
import Signin from "@/views/public/signin.vue";
import Signup from "@/views/public/signup.vue";
import ConfirmEmail from "@/views/public/confirm-email.vue";

// Reports
import Report from "@/views/public/reports/report.vue";
import Evaluation from "@/views/public/reports/evaluation.vue";

// Private
import Layout from "@/views/dashboard/layout.vue";
import ChangePassword from "@/views/public/change-password.vue";
import Settings from "@/views/dashboard/settings/settings.vue";
import Upgrade from "@/views/dashboard/settings/organization/upgrade.vue";
import Upgraded from "@/views/dashboard/settings/organization/upgraded.vue";
import Organization from "@/views/dashboard/settings/organization/organization.vue";

//Openings
import Openings from "@/views/dashboard/openings/openings.vue";
import InterviewResults from "@/views/dashboard/openings/interview-results.vue";

//Opening
import Opening from "@/views/dashboard/opening/opening.vue";
import EditOpening from "@/views/dashboard/opening/edit-opening/edit-opening.vue";
import AddInterview from "@/views/dashboard/opening/add-interview.vue";
import EditInterview from "@/views/dashboard/opening/edit-interview.vue";
import Compare from "@/views/dashboard/opening/compare.vue";

const routes = [
  { path: "/", redirect: "/openings" },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/openings/:openingRef?",
        name: "openings",
        component: Openings,
      },
      {
        name: "opening",
        path: "opening/:openingRef",
        component: Opening,
        children: [
          {
            path: "edit",
            name: "edit-opening",
            component: EditOpening,
          },
          {
            path: "edit/add-interview",
            name: "add-interview",
            component: AddInterview,
          },
          {
            path: "edit/edit-interview/:interviewRef",
            name: "edit-interview",
            component: EditInterview,
          },
          {
            path: "compare",
            name: "compare",
            component: Compare,
          },
          {
            path: "results/:templateRef/:evaluationRef",
            name: "interview-results",
            component: InterviewResults,
          },
        ],
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
      },
      {
        path: "organization",
        name: "organization",
        component: Organization,
      },
      {
        path: "upgrade",
        name: "upgrade",
        component: Upgrade,
      },
      {
        path: "upgraded",
        name: "upgraded",
        component: Upgraded,
      },
    ],
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    meta: {
      public: true,
    },
  },
  {
    path: "/confirm",
    name: "Confirm",
    component: ConfirmEmail,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
    meta: {
      public: true,
    },
  },
  {
    path: "/reports/:candidateKey",
    name: "report",
    component: Report,
    meta: {
      public: true,
    },
  },
  {
    path: "/reports/:candidateKey/evaluations/:evaluationRef",
    name: "evaluation",
    component: Evaluation,
    meta: {
      public: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      public: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      public: true,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
    meta: {
      public: true,
    },
  },
  {
    path: "/change-password",
    name: "change-password",
    component: ChangePassword,
    meta: {
      public: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
