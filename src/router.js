import { createRouter, createWebHistory } from "vue-router";

// Public
const ForgotPassword = () => import("@/views/public/forgot-password.vue");
const NotFound = () => import("@/views/public/not-found.vue");
const Signin = () => import("@/views/public/signin.vue");
const Signup = () => import("@/views/public/signup.vue");

// Private
const Layout = () => import("@/views/dashboard/layout.vue");
const ChangePassword = () =>
  import("@/views/dashboard/settings/change-password.vue");
const Settings = () => import("@/views/dashboard/settings/settings.vue");

//Openings
const Openings = () => import("@/views/dashboard/openings/openings.vue");
const InterviewResults = () =>
  import("@/views/dashboard/openings/interview-results.vue");

//Opening
const Opening = () => import("@/views/dashboard/opening/opening.vue");
const EditOpening = () => import("@/views/dashboard/opening/edit-opening.vue");
const AddInterview = () =>
  import("@/views/dashboard/opening/add-interview.vue");
const ViewInterview = () =>
  import("@/views/dashboard/opening/view-interview.vue");
const EditInterview = () =>
  import("@/views/dashboard/opening/edit-interview.vue");
const CompareCandidates = () =>
  import("@/views/dashboard/opening/compare-candidates.vue");

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
