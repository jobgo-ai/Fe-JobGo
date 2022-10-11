import { useGet } from "./useHttp";
import useAuth from "./useAuth";
let PLANS = [];

const { plan } = useAuth();

const getPlans = async () => {
  const getPlans = useGet("/self/plans");
  await getPlans.get();
  PLANS = getPlans.data.value.plans;
  console.log(PLANS);
};

getPlans();

const getPlanVariable = (feature) => {
  console.log(plan.value);
  const currentTier = PLANS.find((p) => p.tier === plan.value);

  console.log(currentTier);

  return currentTier[feature];
};

export default () => {
  return {
    getPlanVariable,
  };
};
