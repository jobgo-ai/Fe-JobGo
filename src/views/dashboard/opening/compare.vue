<template>
  <div>
    <div class="compare__header">
      <div class="compare__header-container">
        <h2 class="compare__title">Compare candidates</h2>
        <h2 class="compare__subtitle">
          Review your candidates scores and compare them
        </h2>
      </div>
      <div class="compare__filters">
        <hp-tabs
          class="openings__tabs"
          :options="[
            { label: 'Templates', value: 'templates' },
            { label: 'Skills', value: 'skills' },
          ]"
          v-model="filter.dataset"
        />
        <div class="compare__filter__search">
          <hp-input
            name="search"
            variant="search"
            icon="search"
            standalone
            v-model="filter.search"
            placeholder="Search by candidate"
          />
        </div>
        <div class="compare__filter__dropdown">
          <hp-multi-select
            class="add-interview__filter__dropdowns__dropdown"
            label="All Skills"
            :options="skillList"
            name="skills"
            :maxItemsSelected="5"
            v-model="filter.skills"
          ></hp-multi-select>
        </div>
      </div>
    </div>
    <hp-table :data="filteredTableData" :headers="headers">
      <template v-slot:name="{ row }">
        <div>
          <router-link to="/">{{ row.name }}</router-link>
        </div>
      </template>
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
      <template v-for="skill in skillList" v-slot:[skill.value]="{ row }">
        <div v-if="!row[skill.value]">-</div>
        <hp-badge
          v-else
          type="positive"
          :content="row[skill.value].toFixed(1)"
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
import { onMounted, ref, computed, watch } from "vue";
import { formatDistance } from "date-fns";

// Components
import HpTable from "@/components/hp-table.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpMultiSelect from "@/components/form/hp-multi-select.vue";
import HpTabs from "@/components/hp-tabs.vue";

// Composables
import { useGet } from "@/composables/useHttp";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import useOpenings from "@/composables/useOpenings";

const { opening } = useOpenings();
const { setBreadcrumbs } = useBreadcrumbs();

const templateData = ref([]);
const fullSkillData = ref([]);
const skillData = ref([]);
const skillHeaders = ref([]);
const templateHeaders = ref([]);
const templateList = ref([]);
const skillList = ref([]);
const filter = ref({
  search: "",
  dataset: "skills",
  skills: [],
});

watch(
  () => filter.value.skills,
  () => {
    if (
      filter.value.dataset === "skills" &&
      fullSkillData.value.candidates?.length > 0
    ) {
      skillHeaders.value = [
        {
          label: "Candidate",
          value: "name",
        },
        ...filter.value.skills,
      ];
      skillData.value = fullSkillData.value.candidates.map((item) => {
        const skillScores = filter.value.skills.reduce((acc, skill, index) => {
          return {
            ...acc,
            [skill.value]: item.skillScores[index],
          };
        }, {});

        return {
          ...item.candidate,
          ...skillScores,
        };
      });
    }
  }
);

const filteredTableData = computed(() => {
  let sortedData =
    filter.value.dataset === "skills" ? skillData.value : templateData.value;

  if (filter.value.search !== "") {
    sortedData = sortedData.filter((row) => {
      return row.name.toLowerCase().includes(filter.value.search.toLowerCase());
    });
  }
  return sortedData;
});

const headers = computed(() => {
  let computedHeaders =
    filter.value.dataset === "skills"
      ? skillHeaders.value
      : templateHeaders.value;

  return computedHeaders;
});

const loadComparisonData = async (dataset) => {
  const getComparison = useGet(
    `openings/${opening.value.reference}/comparisons/${dataset}`
  );
  await getComparison.get();

  // Sorts template data into list
  if (dataset === "templates") {
    const { templates } = getComparison.data.value.comparisons;

    templateList.value = templates.map((template) => {
      return {
        label: template.name,
        value: template.reference,
        sortable: true,
      };
    });

    templateHeaders.value = [
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

    templateData.value = getComparison.data.value.comparisons.candidates.map(
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
          ...item.candidate,
          time: timeAgo,
          averageScore: item.averageScore,
          ...templatesWithScores,
        };
      }
    );
  }

  //Handle skill data
  if (dataset === "skills") {
    const { skills } = getComparison.data.value.comparisons;
    fullSkillData.value = getComparison.data.value.comparisons;
    skillList.value = skills.map((skill) => {
      return {
        label: skill.name,
        value: skill.slug,
        sortable: true,
      };
    });

    filter.value.skills = skillList.value.slice(0, 5);
    skillHeaders.value = [
      {
        label: "Candidate",
        value: "name",
      },
      ...filter.value.skills,
    ];
    skillData.value = getComparison.data.value.comparisons.candidates.map(
      (item) => {
        const skillScores = filter.value.skills.reduce((acc, skill, index) => {
          return {
            ...acc,
            [skill.value]: item.skillScores[index],
          };
        }, {});

        return {
          ...item.candidate,
          ...skillScores,
        };
      }
    );
  }
};

onMounted(() => {
  loadComparisonData("templates");
  loadComparisonData("skills");

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
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__header-container {
    margin-bottom: 16px;
  }
  &__filters {
    display: flex;
    flex-direction: row;
    align-items: end;
    > * {
      margin-right: 8px;
    }
    &__search {
    }
    &__dropdown {
      width: 200px;
    }
  }
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
    margin-bottom: 12px;
  }
  &__time {
    color: var(--color-text-secondary);
  }
}
</styles>
