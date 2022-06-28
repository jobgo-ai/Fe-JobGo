<template>
  <div>
    <h2 class="compare__title">Compare candidates</h2>
    <h2 class="compare__subtitle">
      Review your candidates scores and compare them
    </h2>
    <hp-table :data="tableData" :headers="headers">
      <template
        v-for="template in templateList"
        v-slot:[template.value]="{ row }"
      >
        <div v-if="!row[template.value]">-</div>
        <hp-badge
          v-else
          type="positive"
          :content="row[template.value].toFixed(1)"
        ></hp-badge>
      </template>
      <template v-slot:time="{ row }">
        <div class="compare__time">
          {{ row.time }}
        </div>
      </template>
      <template v-slot:averageScore="{ row }">
        <div v-if="!row.averageScore">-</div>
        <hp-badge
          v-else
          type="positive"
          :content="row.averageScore.toFixed(1)"
        ></hp-badge>
      </template>
    </hp-table>
  </div>
</template>

<script setup>
// Vendor
import { onMounted, ref } from "vue";
import { formatDistance } from "date-fns";

// Components
import HpTable from "@/components/hp-table.vue";
import HpBadge from "@/components/hp-badge.vue";

// Composables
import { useGet } from "@/composables/useHttp";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import useOpenings from "@/composables/useOpenings";

const { opening } = useOpenings();
const { setBreadcrumbs } = useBreadcrumbs();

const tableData = ref([]);
const headers = ref([]);
const templateList = ref([]);

onMounted(async () => {
  const getComparison = useGet(
    `openings/${opening.value.reference}/comparisons/templates`
  );
  await getComparison.get();

  const { templates } = getComparison.data.value.comparisons;

  templateList.value = templates.map((template) => {
    return {
      label: template.name,
      value: template.reference,
      sortable: true,
    };
  });

  headers.value = [
    {
      value: "name",
      label: "Name",
    },
    {
      value: "time",
      label: "Created",
    },
    {
      value: "averageScore",
      label: "Average Score",
      sortable: true,
    },
    ...templateList.value,
  ];

  tableData.value = getComparison.data.value.comparisons.candidates.map(
    (item) => {
      const templatesWithScores = templateList.value.reduce(
        (acc, template, index) => {
          return {
            ...acc,
            [template.value]: item.templateScores[index],
          };
        },
        {}
      );

      const timeAgo = formatDistance(
        new Date(item.candidate.created),
        new Date(),
        {
          addSuffix: true,
        }
      );

      return {
        name: item.candidate.name,
        time: timeAgo,
        averageScore: item.averageScore,
        ...templatesWithScores,
      };
    }
  );

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
    margin-bottom: 32px;
  }
  &__time {
    color: var(--color-text-secondary);
  }
}
</styles>
