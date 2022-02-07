import { ref } from "vue";

const crumbs = ref([]);
const hasHeaderSaveButton = ref(false);

export const useBreadcrumbs = () => {
  const setBreadcrumbs = (newCrumbs, saveButton = false) => {
    crumbs.value = newCrumbs;
    hasHeaderSaveButton.value = saveButton;
  };

  return {
    crumbs,
    hasHeaderSaveButton,
    setBreadcrumbs,
  };
};
