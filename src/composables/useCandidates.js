import { ref } from "vue";
import { useGet } from "./useHttp";
import { useRoute } from "vue-router";

export default () => {
  const route = useRoute();
  const isCandidateListLoading = ref(false);
  const isInfiniteLoading = ref(false);
  const isCandidateLoading = ref(true);
  const candidate = ref({});
  const candidates = ref([]);
  const templateList = ref([]);

  const fetchMoreCandidates = async (url) => {
    const endpoint = url;
    isInfiniteLoading.value = true;
    const getCandidates = useGet(endpoint);
    await getCandidates.get();
    candidates.value = [
      ...candidates.value,
      ...getCandidates.data.value.candidates,
    ];
    isInfiniteLoading.value = false;
  };

  const fetchCandidates = async (url) => {
    // if (candidates.value[0]?.opening.reference === openingRef && !isForced) {
    //   return;
    // }
    const endpoint = url
      ? url
      : `openings/${route.params.openingRef}/candidates`;
    isCandidateListLoading.value = true;
    const getCandidates = useGet(endpoint);
    await getCandidates.get();
    candidates.value = getCandidates.data.value.candidates;
    isCandidateListLoading.value = false;
  };

  const fetchCandidate = async (candidateRef) => {
    isCandidateLoading.value = true;
    const getCandidate = useGet(`candidates/${candidateRef}`);
    await getCandidate.get();
    candidate.value = getCandidate.data.value.candidate;
    isCandidateLoading.value = false;
  };
  return {
    isCandidateListLoading,
    isCandidateLoading,
    candidates,
    fetchMoreCandidates,
    candidate,
    templateList,
    isInfiniteLoading,
    fetchCandidates,
    fetchCandidate,
  };
};
