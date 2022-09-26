import useAuth from "./useAuth";

const { plan } = useAuth();

const PLAN_VARIABLES = {
  openings: {
    free: 2,
    startup: 5,
    growth: 20,
    enterprise: 10000,
  },
};

const getPlanVariable = (feature) => {
  return PLAN_VARIABLES[feature][plan.value];
};

export default () => {
  return {
    getPlanVariable,
  };
};
