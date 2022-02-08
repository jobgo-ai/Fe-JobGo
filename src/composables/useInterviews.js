import { ref } from "vue";
import { useGet } from "./useHttp";

const isInterviewLoading = ref(true);
const interview = ref([]);

const setInterview = (newInterview) => {
  interview.value = newInterview;
};

const fetchInterview = async (interviewRef) => {
  isInterviewLoading.value = true;
  const getInterview = useGet(`templates/${interviewRef}`);
  await getInterview.get();
  const formattedInterview = {
    ...getInterview.data.value.template,
    ceremony: {
      warmup: {
        ...getInterview.data.value.template.ceremony.warmup,
        duration:
          getInterview.data.value.template.ceremony.warmup.duration / 60,
      },
      cooldown: {
        ...getInterview.data.value.template.ceremony.cooldown,
        duration:
          getInterview.data.value.template.ceremony.cooldown.duration / 60,
      },
    },
  };
  interview.value = formattedInterview;
  isInterviewLoading.value = false;
};

export default () => {
  return {
    isInterviewLoading,
    interview,
    fetchInterview,
    setInterview,
  };
};
