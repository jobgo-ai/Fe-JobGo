import { ref } from "vue";
import { useGet } from "./useHttp";

const isCandidateListLoading = ref(false);
const isCandidateLoading = ref(true);
const candidate = ref({});
const candidates = ref([]);
const templateList = ref([]);

const fetchCandidates = async (openingRef) => {
  if (candidates.value[0]?.opening.reference === openingRef) {
    return;
  }
  isCandidateListLoading.value = true;
  const getCandidates = useGet(`openings/${openingRef}/candidates`);
  await getCandidates.get();
  candidates.value = getCandidates.data.value?.candidates.filter(
    (c) => c.state === "active"
  );

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

const fetchCandidate = async (candidateRef) => {
  isCandidateLoading.value = true;
  const getCandidate = useGet(`candidates/${candidateRef}`);
  await getCandidate.get();
  candidate.value = getCandidate.data.value.candidate;
  isCandidateLoading.value = false;
};

export default () => {
  return {
    isCandidateListLoading,
    isCandidateLoading,
    candidates,
    candidate,
    templateList,
    fetchCandidates,
    fetchCandidate,
  };
};
