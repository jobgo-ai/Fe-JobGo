import { ref, onUnmounted, onMounted } from "vue";
import { useGet } from "./useHttp";

const isOpeningsLoading = ref(true);
const openings = ref([]);
const opening = ref([]);

const getOpenings = useGet();

const fetchOpenings = async (state = "active") => {
  if (getOpenings.loading.value) {
    getOpenings.controller.abort();
  }
  isOpeningsLoading.value = true;
  const url = `openings?state=${state.toLowerCase()}`;
  await getOpenings.get(url);
  if (getOpenings.data.value) {
    openings.value = getOpenings.data.value.openings;
  }
  isOpeningsLoading.value = false;
};

const updateOpenings = async (state = "active") => {
  if (getOpenings.loading.value) {
    getOpenings.controller.abort();
  }
  const url = `openings?state=${state.toLowerCase()}`;
  await getOpenings.get(url);
  if (getOpenings.data.value) {
    openings.value = getOpenings.data.value.openings;
  }
  isOpeningsLoading.value = false;
};

const fetchOpening = async (openingRef) => {
  const getOpening = useGet(`openings/${openingRef}`);
  await getOpening.get();
  opening.value = getOpening.data.value.opening;
};

const setOpenings = (newOpenings) => {
  openings.value = newOpenings;
};

export default () => {
  return {
    fetchOpening,
    setOpenings,
    fetchOpenings,
    updateOpenings,
    opening,
    isOpeningsLoading,
    openings,
  };
};
