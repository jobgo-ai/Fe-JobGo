import useAuth from "./useAuth";

const { plan } = useAuth();

const PLAN_VARIABLES = {
  openings: {
    free: 2,
    basic: 5,
    startup: 20,
    enterprise: 10000,
  },
};

const PLAN_FEATURES = {
  free: {},
  basic: {},
  startup: {},
  enterprise: {},
};

const getPlanVariable = (feature) => {
  return PLAN_VARIABLES[feature][plan.value];
};

export default () => {
  return {
    getPlanVariable,
  };
};
