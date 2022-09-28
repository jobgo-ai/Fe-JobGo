import useAuth from "./useAuth";

const { plan } = useAuth();

const PLAN_VARIABLES = {
  openings: {
    free: 2,
    startup: 5,
    growth: 20,
    enterprise: 10000,
  },
  payment: {
    startup: {
      monthly: import.meta.env.VITE_PAYMENT_STARTUP_MONTHLY,
      yearly: import.meta.env.VITE_PAYMENT_STARTUP_YEARLY,
    },
    growth: {
      monthly: import.meta.env.VITE_PAYMENT_GROWTH_MONTHLY,
      yearly: import.meta.env.VITE_PAYMENT_GROWTH_YEARLY,
    },
  },
};

const getPlanVariable = (feature, currentPlan = plan.value) => {
  return PLAN_VARIABLES[feature][currentPlan];
};

export default () => {
  return {
    getPlanVariable,
  };
};
