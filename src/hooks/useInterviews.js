import { ref } from "vue";
import { useGet } from "./useHttp";

const isInterviewLoading = ref(true);
const interview = ref([]);

const fetchInterview = async (interviewRef) => {
  isInterviewLoading.value = true;
  const getInterview = useGet(`templates/${interviewRef}`);
  await getInterview.get();
  interview.value = getInterview.data.value.template;
  isInterviewLoading.value = false;
};

export default () => {
  return {
    isInterviewLoading,
    interview,
    fetchInterview,
  };
};
