import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import useAuth from "@/composables/useAuth";
import useContextSave from "@/composables/useContextSave";

const app = createApp(App);

// Router before each
router.beforeEach(async (to, from, next) => {
  const { isDirty, clearIsDirty } = useContextSave();
  if (isDirty.value) {
    const dialogText =
      "You have unsaved changes, are you sure you want to leave?";
    const confirm = window.confirm(dialogText);
    if (!confirm) {
      next(false);
      return;
    }
    if (confirm) {
      clearIsDirty();
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Hireproof";
  }
  const { user, refreshToken, token, setUser } = useAuth();

  // Token but no user
  if (token.value && !user.value) {
    await refreshToken();
  }
  if (to.query.user_token && !user.value) {
    console.log("fuck");
    console.log(to);
    setUser({ token: to.params.user_token });
    await refreshToken();
  }

  // Going to private route, with no user
  if (!to.meta.public && !user.value) {
    next({ name: "signin" });
    // going to unauthed route with logged in user
  } else if ((to.name == "signin" || to.name == "signup") && user?.value)
    next({ name: "openings" });
  else if (
    to.meta.super &&
    !user.value.user.organization?.slug === "hireproof"
  ) {
    next({ name: "openings" });
  }
  // finally
  else next();
});

app.use(router).mount("#app");
