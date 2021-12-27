import { createRouter, createWebHistory } from "vue-router";

// Public
import ForgotPassword from "@/views/public/forgot-password.vue";
import NotFound from "@/views/public/not-found.vue";
import Signin from "@/views/public/signin.vue";
import Signup from "@/views/public/signup.vue";

// Private
import Openings from "@/views/openings.vue";

const routes = [
  {
    path: "/openings",
    name: "openings",
    component: Openings,
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
