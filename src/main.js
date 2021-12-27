import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import useAuth from "@/hooks/useAuth";
// import mixpanel from "mixpanel-browser";

const app = createApp(App);

// mixpanel.init(import.meta.env.VITE_MIX_PANEL_TOKEN, {
//   api_host: "https://proxy.hireproof.io/mixpanel",
//   debug: false,
// });
// app.provide("mixpanel", mixpanel);

// Router before each
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = "Beta" + ` | ${to.meta.title}`;
  } else {
    document.title = "Hireproof | Beta";
  }
  const { user, refreshToken, token } = useAuth();

  // Token but no user
  if (token.value && !user.value) {
    await refreshToken();
  }

  // Going to private route, with no user
  if (!to.meta.public && !user.value) {
    next({ name: "login" });
    // going to unauthed route with logged in user
  } else if ((to.name == "login" || to.name == "signup") && user?.value)
    next({ name: "home" });
  else if (
    to.meta.super &&
    !user.value.user.organization?.slug === "hireproof"
  ) {
    next({ name: "home" });
  }
  // finally
  else next();
});

// router.afterEach((to, from) => {
//   mixpanel.track("pageView", {
//     to: to.path,
//     from: from.path,
//     pageName: to.name,
//   });
// });

app.use(router).mount("#app");
