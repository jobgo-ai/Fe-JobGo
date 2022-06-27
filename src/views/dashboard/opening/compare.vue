<template>
  <div>
    <h2 class="compare__title">Compare candidates</h2>
    <h2 class="compare__subtitle">
      Review your candidates scores and compare them
    </h2>
  </div>
</template>

<script setup>
// Vendor
import { onMounted } from "vue";

// Components

// Composables
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import useOpenings from "@/composables/useOpenings";

const { opening } = useOpenings();
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    {
      label: "Openings",
      to: "/openings",
    },
    {
      label: opening.value.name,
      to: `/opening/${opening.value.reference}/edit`,
    },
    {
      label: "Compare",
      to: `/opening/${opening.value.reference}/compare`,
    },
  ]);
});
</script>

<styles lang="scss">
.compare {
  &__title {
    @include text-h2;
    font-weight: 600;
  }
  &__subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: var(--color-text-secondary);
  }
}
</styles>
