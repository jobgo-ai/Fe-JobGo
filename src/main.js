import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import useAuth from "@/hooks/useAuth";
import useContextSave from "@/hooks/useContextSave";

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
