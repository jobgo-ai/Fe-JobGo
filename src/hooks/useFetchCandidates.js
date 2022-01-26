import { ref } from "vue";
import { useGet } from "./useHttp";

const isCandidateListLoading = ref(true);
const candidates = ref([]);
const templateList = ref([]);

const fetchCandidates = async (openingRef) => {
  isCandidateListLoading.value = true;
  const getCandidates = useGet(`openings/${openingRef}/candidates`);
  await getCandidates.get();
  candidates.value = getCandidates.data.value?.candidates;

  templateList.value =
    getCandidates.data.value?.candidates[0]?.opening.templates
      .map((template) => ({
        label: template.name,
        value: false,
      }))
      .concat(
        [],
        [
          {
            label: "All interviews",
            value: true,
          },
        ]
      );

  isCandidateListLoading.value = false;
};

export default () => {
  return {
    isCandidateListLoading,
    candidates,
    templateList,
    fetchCandidates,
  };
};
