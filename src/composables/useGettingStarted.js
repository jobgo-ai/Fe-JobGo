import { ref } from "vue";
import { useGet } from "@/composables/useHttp";

const checklist = ref({
  account: true,
  opening: false,
  template: false,
  question: false,
  candidate: false,
  interviewed: false,
  invited: false,
});

export const useGettingStarted = () => {
  const fetchChecklist = async () => {
    const getGettingStarted = useGet("self/getting-started");
    await getGettingStarted.get();
    checklist.value = {
      ...checklist.value,
      ...getGettingStarted.data.value.checklist,
    };
  };

  return {
    fetchChecklist,
    checklist,
  };
};
