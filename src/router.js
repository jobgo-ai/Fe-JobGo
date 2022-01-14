import { createRouter, createWebHistory } from "vue-router";

// Public
import ForgotPassword from "@/views/public/forgot-password.vue";
import NotFound from "@/views/public/not-found.vue";
import Signin from "@/views/public/signin.vue";
import Signup from "@/views/public/signup.vue";

// Private
import Layout from "@/views/dashboard/layout.vue";
import ChangePassword from "@/views/dashboard/settings/change-password.vue";
import Settings from "@/views/dashboard/settings/settings.vue";

//Openings
import Openings from "@/views/dashboard/openings/openings.vue";
import InterviewResults from "@/views/dashboard/openings/interview-results.vue";

//Opening
import Opening from "@/views/dashboard/opening/opening.vue";
import EditOpening from "@/views/dashboard/opening/edit-opening.vue";
import AddInterview from "@/views/dashboard/opening/add-interview.vue";
import ViewInterview from "@/views/dashboard/opening/view-interview.vue";
import EditInterview from "@/views/dashboard/opening/edit-interview.vue";
import CompareCandidates from "@/views/dashboard/opening/compare-candidates.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/openings/:openingRef?",
        name: "openings",
        component: Openings,
        children: [
          // {
          //   path: ":openingRef/candidates/:candidateRef/results/:interviewRef",
          //   name: "interview-results",
          //   component: InterviewResults,
          // },
        ],
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
            path: "view/view-interview/:interviewRef",
            name: "view-interview",
            component: ViewInterview,
          },
          {
            path: "compare",
            name: "compare-candidates",
            component: CompareCandidates,
          },
        ],
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
      },
      {
        path: "change-password",
        name: "change-password",
        component: ChangePassword,
      },
    ],
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
