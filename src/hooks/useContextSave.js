import { ref, watch, computed } from "vue";

const handleSave = ref(() => {
  console.log("handleSave");
});

const isDirty = ref(false);

export default function (metaReference, onSubmit) {
  handleSave.value = onSubmit;

  const dirtyChange = computed(() => metaReference?.value?.dirty);

  watch(dirtyChange, () => {
    isDirty.value = dirtyChange.value;
  });

  return {
    isDirty,
    handleSave,
  };
}
