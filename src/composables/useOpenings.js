import { ref } from "vue";
import { useGet } from "./useHttp";

const limit = 15;

const offset = ref(0);
const hasMoreData = ref(true);
const isOpeningsLoading = ref(true);
const isLoadingMoreLoading = ref(false);
const openings = ref([]);
const opening = ref([]);

const getOpenings = useGet();

const fetchOpenings = async (isLoadMore = false, state = "active") => {
  if (getOpenings.loading.value) {
    getOpenings.controller.abort();
  }

  if (isLoadMore && !hasMoreData) {
    return;
  }

  if (isLoadMore) {
    offset.value = offset.value + limit;
  } else {
    offset.value = 0;
  }

  if (!isLoadMore) {
    isOpeningsLoading.value = true;
  } else {
    isLoadingMoreLoading.value = true;
  }

  const url = `openings?state=${state.toLowerCase()}&limit=${limit}&offset=${
    offset.value
  }`;
  await getOpenings.get(url);
  if (getOpenings.data.value) {
    if (isLoadMore) {
      if (getOpenings.data.value.openings.length < limit) {
        hasMoreData.value = false;
      }
      openings.value = [...openings.value, ...getOpenings.data.value.openings];
    } else {
      openings.value = getOpenings.data.value.openings;
    }
  }
  isOpeningsLoading.value = false;
  isLoadingMoreLoading.value = false;
};

const updateOpenings = async () => {
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
    hasMoreData,
    offset,
    opening,
    isOpeningsLoading,
    openings,
  };
};
