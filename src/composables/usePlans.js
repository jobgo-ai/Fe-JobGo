import { plan } from "./useAuth";

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
  return PLAN_VARIABLES[feature][plan];
};

export default () => {
  return {
    getPlanVariable,
  };
};
