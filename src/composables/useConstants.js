import { reactive, toRefs } from "vue";
import { useGet } from "@/hooks/useHttp";

const constants = reactive({
  competencies: [],
  jobLevels: [],
});

export default function useConstants() {
  const loadCompetencies = async () => {
    const getCompetencies = useGet("competencies");
    await getCompetencies.get();
    constants.competencies = getCompetencies.data.value.competencies;
  };

  const loadQuestionLevels = async () => {
    const getLevels = useGet("job-levels");
    await getLevels.get();
    constants.jobLevels = getLevels.data.value.jobLevels;
  };

  return {
    ...toRefs(constants),
    loadCompetencies,
    loadQuestionLevels,
  };
}
