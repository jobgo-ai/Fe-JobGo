import { createRouter, createWebHistory } from "vue-router";

// Public
import ForgotPassword from "@/views/public/forgot-password.vue";
import NotFound from "@/views/public/not-found.vue";
import Signin from "@/views/public/signin.vue";
import Signup from "@/views/public/signup.vue";

// Private
import Layout from "@/views/dashboard/layout.vue";
import Openings from "@/views/dashboard/openings/openings.vue";
import OpeningsList from "@/views/dashboard/openings/openings-list.vue";
import OpeningCandidateDetails from "@/views/dashboard/openings/opening-candidate-details.vue";

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
            name: "opening-candidate-details",
            component: OpeningCandidateDetails,
          },
        ],
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
