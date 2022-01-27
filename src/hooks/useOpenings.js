import { ref } from "vue";
import { useGet } from "./useHttp";

const isOpeningsLoading = ref(true);
const openings = ref([]);

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

export default () => {
  return {
    fetchOpenings,
    isOpeningsLoading,
    openings,
  };
};
