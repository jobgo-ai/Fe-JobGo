import { reactive, toRefs } from "vue";
import { useGet } from "./useHttp";
import useOpenings from "./useOpenings";

const AUTH_KEY = "hireproof_token";
export const AUTH_TOKEN = "token";

export const state = reactive({
  user: null,
  error: null,
  token: null,
  organization: null,
});

const token = window.localStorage.getItem(AUTH_KEY);
if (token) {
  state.token = token;
}

export const refreshToken = async () => {
  const { error, data, get } = useGet("self");

  await get();

  if (error.value) {
    state.token = null;
    window.localStorage.removeItem(AUTH_KEY);
  } else if (data.value) {
    state.user = data.value.self;
    window.Intercom("update", { ...data.value.self });
    state.organization = data.value.self.organization;
  }
};

export default () => {
  const setUser = (payload, remember) => {
    if (remember) {
      window.localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN]);
    }
    document.cookie = "backofficeUser=true; SameSite=None; Secure";

    state.token = payload[AUTH_TOKEN];
    state.error = undefined;
  };

  const setUserDetails = (data) => {
    state.user = data;
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY);
    const { setOpenings } = useOpenings();
    setOpenings([]);
    state.token = null;
    state.user = null;
    return Promise.resolve((state.token = null));
  };

  return {
    setUser,
    setUserDetails,
    logout,
    refreshToken,
    ...toRefs(state),
  };
};
