import { createRouter, createWebHistory } from "vue-router";

// Public
import ForgotPassword from "@/views/public/forgot-password.vue";
import NotFound from "@/views/public/not-found.vue";
import Signin from "@/views/public/signin.vue";
import Signup from "@/views/public/signup.vue";

// Private
import Layout from "@/views/dashboard/layout.vue";
import Passthrough from "@/views/dashboard/passthrough.vue";
import Settings from "@/views/dashboard/settings/settings.vue";

//Openings
import Openings from "@/views/dashboard/openings/openings.vue";
import OpeningsList from "@/views/dashboard/openings/openings-list.vue";
import CandidateDetails from "@/views/dashboard/openings/candidate-details.vue";

//Opening
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
        path: "/openings",
        name: "openings",
        component: Openings,
        children: [
          {
            path: ":openingRef",
            name: "openings-list",
            component: OpeningsList,
          },
          {
            path: ":openingRef/candidates/:candidateRef",
            name: "candidate-details",
            component: CandidateDetails,
          },
        ],
      },
      {
        name: "opening",
        path: "opening/:openingRef",
        component: Passthrough,
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
