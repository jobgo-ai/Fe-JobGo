<template>
  <div class="hp-table">
    <table class="hp-table__table">
      <thead class="hp-table__table__head">
        <tr class="hp-table__table__head__row">
          <th
            class="hp-table__table__head__col"
            v-for="(header, index) in headers"
            :key="index"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="hp-table__table__body">
        <tr
          class="hp-table__table__body__row"
          v-for="(row, index) in data"
          :key="index"
        >
          <td
            class="hp-table__table__body__col"
            v-for="(header, index) in headers"
            :key="index"
          >
            {{ row[header.value] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
</script>

<style lang="scss">
.hp-table {
  &__table {
    table-layout: auto;
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
        }
        &:last-child {
          padding: 12px 24px;
          border-top-right-radius: 12px;
          border: 1px solid var(--color-border);
          border-left: none;
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
        width: 100%;
        &:last-child {
          &__col {
            border-bottom: none !important;
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
