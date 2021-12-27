import { createRouter, createWebHistory } from "vue-router";

import ForgotPassword from "@/views/forgot-password.vue";
import NotFound from "@/views/not-found.vue";
import Signin from "@/views/signin.vue";
import Signup from "@/views/signup.vue";

const routes = [
  {
    path: "/",
    children: [],
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
