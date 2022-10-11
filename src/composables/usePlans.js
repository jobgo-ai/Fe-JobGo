import { useGet } from "./useHttp";
import useAuth from "./useAuth";
let PLANS = [];

const PAYMENTS = {
  startup: {
    monthly: import.meta.env.VITE_PAYMENT_STARTUP_MONTHLY,
    yearly: import.meta.env.VITE_PAYMENT_STARTUP_YEARLY,
  },
  growth: {
    monthly: import.meta.env.VITE_PAYMENT_GROWTH_MONTHLY,
    yearly: import.meta.env.VITE_PAYMENT_GROWTH_YEARLY,
  },
};

const { plan } = useAuth();

const getPlans = async () => {
  const getPlans = useGet("/self/plans");
  await getPlans.get();
  PLANS = getPlans.data.value.plans;
  console.log(PLANS);
};

getPlans();

const getPlanVariable = (feature) => {
  const currentTier = PLANS.find((p) => p.tier === plan.value);

  return currentTier[feature];
};

const getPaymentLink = (plan, billingperiod) => {
  return PAYMENTS[plan][billingperiod];
};

export default () => {
  return {
    getPlanVariable,
    getPaymentLink,
  };
};
