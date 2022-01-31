import { ref, watch, computed } from "vue";

const isSaving = ref(false);
const handleSave = ref(() => {
  console.log("handleSave");
});

const isDirty = ref(false);

export default function (metaReference, onSubmit) {
  handleSave.value = async () => {
    isSaving.value = true;
    setTimeout(() => {
      console.log("whatsup");
    }, 1000);
    await onSubmit();
    isSaving.value = false;
  };

  const dirtyChange = computed(() => metaReference?.value?.dirty);

  watch(dirtyChange, () => {
    isDirty.value = dirtyChange.value;
  });

  return {
    isContextFormSaving: isSaving,
    isContextFormDirty: isDirty,
    handleContextFormSave: handleSave,
  };
}
