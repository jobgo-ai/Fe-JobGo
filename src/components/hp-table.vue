<template>
  <div class="hp-table">
    <table class="hp-table__table">
      <thead class="hp-table__table__head">
        <tr class="hp-table__table__head__row">
          <th
            @click="handleHeaderColClick(header)"
            :class="headerClasses(header)"
            v-for="(header, index) in headers"
            :key="index"
          >
            <div class="hp-table__table__head__col__content">
              <div class="hp-table__table__head__col__content__content">
                {{ header.label }}
                <div
                  class="hp-table__table__head__col__icon"
                  :class="
                    header.sortable &&
                    selectedRow === header.value &&
                    'hp-table__table__head__col__icon--visible'
                  "
                >
                  <hp-icon
                    v-show="sortDirection === 'desc'"
                    size="18"
                    name="chevron-down"
                  ></hp-icon>
                  <hp-icon
                    v-show="sortDirection === 'asc'"
                    size="18"
                    name="chevron-up"
                  ></hp-icon>
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="hp-table__table__body">
        <tr
          class="hp-table__table__body__row"
          v-for="(row, index) in sortedData"
          :key="index"
        >
          <td
            class="hp-table__table__body__col"
            v-for="(header, index) in headers"
            :key="index"
          >
            <slot :name="header.value" :row="row">{{ row[header.value] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Vendor
import { ref, computed } from "vue";

// Composables
import HpIcon from "@/components/hp-icon.vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  headers: {
    type: Array,
    default: () => [],
  },
});

const sortDirection = ref("off");
const selectedRow = ref(null);

const handleHeaderColClick = (header) => {
  if (header.sortable && selectedRow.value !== header.value) {
    sortDirection.value = "off";
    selectedRow.value = null;
  }
  if (header.sortable) {
    switch (sortDirection.value) {
      case "off":
        selectedRow.value = header.value;
        sortDirection.value = "asc";
        break;
      case "asc":
        selectedRow.value = header.value;
        sortDirection.value = "desc";
        break;
      case "desc":
        sortDirection.value = "off";
        selectedRow.value = null;
        break;
    }
  }
};

const headerClasses = (header) => {
  const classes = ["hp-table__table__head__col"];
  if (header.sortable) {
    classes.push("hp-table__table__head__col--sortable");
    if (header.value === selectedRow.value) {
      classes.push("hp-table__table__head__col--active");
    }
  }
  return classes;
};

const sortedData = computed(() => {
  const isSortable = props.headers.find((header) => header.sortable);
  if (!isSortable || !selectedRow.value) {
    return props.data;
  }

  const selectedHeader = props.headers.find(
    (header) => header.value === selectedRow.value
  );

  const isAscended = sortDirection.value === "asc";

  const ascSortedData = props.data.sort((a, b) => {
    const aValue = a[selectedHeader.value] || 0;
    const bValue = b[selectedHeader.value] || 0;
    if (aValue < bValue) {
      return isAscended ? -1 : 1;
    }
    if (aValue > bValue) {
      return isAscended ? 1 : -1;
    }
    return 0;
  });

  return ascSortedData;
});
</script>

<style lang="scss">
.hp-table {
  &__table {
    table-layout: fixed;
    width: 100%;
    text-align: center;
    border-spacing: 0;
    &__head {
      display: table-header-group;
      &__col {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: var(--color-text-secondary);
        border: 1px solid var(--color-border);
        border-right: none;
        border-left: none;
        background-color: var(--color-panel);
        text-transform: uppercase;
        letter-spacing: 0.01em;
        &:first-child {
          padding: 12px 24px;
          text-align: left;
          border-top-left-radius: 12px;
          border: 1px solid var(--color-border);
          border-right: none;
          .hp-table__table__head__col__content {
            justify-content: start;
          }
        }
        &:last-child {
          padding: 12px 24px;
          border-top-right-radius: 12px;
          border: 1px solid var(--color-border);
          border-left: none;
        }
        &__content {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          &__content {
            display: block;
            position: relative;
          }
        }
        &__icon {
          transition: opacity 0.15s ease-in-out;
          opacity: 0;
          position: absolute;
          right: -18px;
          top: 50%;
          transform: translateY(-50%);
          &--visible {
            opacity: 1;
          }
        }
        &--sortable {
          cursor: pointer;
          user-select: none;
        }
        &--active {
          background-color: var(--color-underground);
        }
      }
      &__row {
        width: 100%;
      }
    }
    &__body {
      padding: 24px 12px;
      display: table-row-group;
      &__row {
        transition: background-color 0.15s ease-in-out;
        &:hover {
          background-color: var(--color-panel);
        }
        width: 100%;
        &:last-child {
          .hp-table__table__body__col {
            border-bottom: 1px solid var(--color-border);
            &:first-child {
              border-bottom-left-radius: 12px;
            }
            &:last-child {
              border-bottom-right-radius: 12px;
            }
          }
        }
      }
      &__col {
        border-bottom: 1px dashed var(--color-border);
        &:first-child {
          padding: 16px 24px;
          text-align: left;
          border-left: 1px solid var(--color-border);
        }
        &:last-child {
          padding: 16px 24px;
          border-right: 1px solid var(--color-border);
        }
      }
    }
  }
}
</style>
