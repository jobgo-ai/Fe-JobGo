<template>
  <div class="hp-danger-zone">
    <hp-modal
      @close="isConfirmationModalOpen = false"
      :isOpen="isConfirmationModalOpen"
    >
      <div class="hp-danger-zone__modal">
        <h4 class="hp-danger-zone__title">Confirm delete</h4>
        <p class="hp-danger-zone__subtitle">
          This is a permanent deletion, all related data will be lost.
        </p>
        <p class="hp-danger-zone__warning">This action is not reversable</p>
        <hp-input
          icon="locked"
          label="To confirm, please type DELETE"
          v-model="confirmation"
          standalone
        ></hp-input>
        <hp-button
          label="Confirm"
          :isDisabled="confirmation !== 'DELETE'"
          @handleClick="onConfirm"
          destructive
        ></hp-button>
      </div>
    </hp-modal>
    <h4 class="hp-danger-zone__title">Danger zone</h4>
    <p class="hp-danger-zone__subtitle">
      After you perform this action, there is no going back
    </p>
    <hp-button
      @handleClick="isConfirmationModalOpen = true"
      destructive
      :label="label"
    ></hp-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HpButton from "@/components/hp-button.vue";
import HpInput from "@/components/form/hp-input.vue";
import HpModal from "@/components/hp-modal.vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  safteyString: {
    type: String,
    default: "Delete",
  },
  onConfirm: {
    type: Function,
    default: () => {},
  },
});

const isConfirmationModalOpen = ref(false);
const confirmation = ref("eee");
</script>

<style lang="scss" scoped>
.hp-danger-zone {
  width: 100%;
  padding: 24px;
  outline: 4px solid var(--color-background-negative);
  border-radius: $border-radius-md;
  &__title {
    font-weight: 500;
    @include text-h5;
  }
  &__subtitle {
    color: var(--color-text-secondary);
    margin-bottom: 16px;
  }
  &__warning {
    color: var(--color-error);
    margin-bottom: 16px;
  }
  &__modal {
    padding: 24px;
  }
}
</style>
