import { ref, watch } from "vue";

const handleSave = ref(() => () => {
  console.log("handleSave");
});

const isDirty = ref(false);

export default function (computedDirtDog, onSubmit) {
  handleSave.value = onSubmit;

  watch(computedDirtDog, () => {
    isDirty.value = !isDirty.value;
  });

  return {
    isDirty,
    handleSave,
  };
}
