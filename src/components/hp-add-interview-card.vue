<template>
  <li class="hp-add-opening-card">
    <div class="hp-add-opening-card__add-new" v-if="isAddCard">
      <div>
        <div class="hp-add-opening-card__add-new__icon-container">
          <hp-icon :size="24" name="plus"></hp-icon>
        </div>
        <p class="hp-add-opening-card__content__name">Start from scratch</p>
        <p class="hp-add-opening-card__content__description">
          Create your own interview
        </p>
      </div>
      <div>
        <hp-button
          :to="`/opening/${route.params.openingRef}/edit/add-interview`"
          label="Start from scratch"
        ></hp-button>
      </div>
    </div>
    <div class="hp-add-opening-card__content" v-else>
      <div class="hp-add-opening-card__badge-container">
        <hp-badge icon="layers" :content="index"></hp-badge>
        <hp-icon
          class="hp-add-opening-card__badge-container__handle"
          name="drag"
          size="24"
        ></hp-icon>
      </div>
      <div class="hp-add-opening-card__name">{{ template.name }}</div>
      <div class="hp-add-opening-card__fact">
        <hp-icon
          class="hp-add-opening-card__fact__icon"
          name="chronometer"
          :size="15"
        ></hp-icon>
        {{ secondsToMinutes(template.statistics.duration) }} minutes
      </div>
      <div class="hp-add-opening-card__fact">
        <hp-icon
          class="hp-add-opening-card__fact__icon"
          name="questions"
          :size="15"
        ></hp-icon>

        {{ template.statistics.questions }} questions
      </div>
      <div class="hp-add-opening-card__actions">
        <hp-button
          class="hp-add-opening-card__actions__button"
          icon="trash"
        ></hp-button>
        <hp-button label="Edit interview"></hp-button>
      </div>
    </div>
  </li>
</template>

<script setup>
import HpButton from "@/components/hp-button.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpIcon from "@/components/hp-icon.vue";
import { useRoute } from "vue-router";
const props = defineProps({
  opening: {
    type: Object,
    default: () => ({}),
  },
  template: {
    type: Object,
    default: () => ({}),
  },
  isAddCard: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const route = useRoute();

const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};
</script>

<style lang="scss">
.hp-add-opening-card {
  height: 236px;
  width: 264px;
  cursor: pointer;
  list-style: none;
  border-radius: $border-radius-lg;
  border: $border;
  &__name {
    font-weight: 500;
    @include text-h5;
    margin-bottom: 16px;
  }
  &__badge-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    &__handle {
      cursor: grab;
    }
  }
  &__content {
    padding: 16px;
  }
  &__fact {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    &__icon {
      margin-right: 4px;
      color: var(--color-text-secondary);
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    margin-top: auto;
    &__button {
      margin-right: 6px;
    }
  }

  &--selected {
    background-color: var(--color-panel);
  }
  &:hover {
    box-shadow: inset 0px 0px 4px rgba(33, 44, 51, 0.01),
      inset 0px 0px 48px rgba(33, 44, 51, 0.03);
  }
  &__add-new {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    &__icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      border: 1px dashed var(--color-border);
      border-radius: $border-radius-lg;
      margin-bottom: 16px;
    }
  }
}
</style>
