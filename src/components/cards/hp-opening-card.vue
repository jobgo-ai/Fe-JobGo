<template>
  <li :class="containerClasses">
    <div class="hp-opening-card__add-new" v-if="isAddCard">
      <div>
        <div class="hp-opening-card__add-new__icon-container">
          <hp-icon :size="24" name="plus"></hp-icon>
        </div>
        <p class="hp-opening-card__content__name">New opening</p>
        <p class="hp-opening-card__content__description">
          Easily define a new opening
        </p>
      </div>
      <div>
        <hp-button
          @handleClick="$emit('handleAddNew')"
          label="Create new"
        ></hp-button>
      </div>
    </div>
    <div class="hp-opening-card__archived" v-if="isArchived">
      <div class="hp-opening-card__archived-header">
        <hp-abstract-avatar :abstractKey="opening.artwork" />
        <hp-button
          @handleClick="$emit('unarchiveOpening', opening)"
          label="Restore"
        >
        </hp-button>
      </div>
      <div class="hp-opening-card__content">
        <h4 class="hp-opening-card__content__name">{{ opening.name }}</h4>
        <div class="hp-opening-card__content__description">
          {{ opening.description }}
        </div>
        <div class="hp-opening-card__content__badges">
          <hp-badge
            icon="layers"
            class="hp-opening-card__content__badges__badge"
            :content="opening.statistics.templates"
          ></hp-badge>
          <hp-badge
            icon="skills"
            class="hp-opening-card__content__badges__badge"
            :content="opening.statistics.skills.length"
          ></hp-badge>
          <hp-badge
            icon="candidates"
            class="hp-opening-card__content__badges__badge"
            :content="opening.statistics.candidates"
          ></hp-badge>
        </div>
      </div>
    </div>
    <div
      class="hp-opening-card__content-container"
      v-if="!isArchived && !isAddCard"
    >
      <div class="hp-opening-card__splash">
        <component
          :is="splash"
          role="img"
          :alt="splash"
          :key="opening.reference"
          class="hp-opening-card__splash__image"
        />
      </div>
      <div class="hp-opening-card__content">
        <h4 class="hp-opening-card__content__name">{{ opening.name }}</h4>
        <div class="hp-opening-card__content__description">
          {{ opening.description }}
        </div>
        <div class="hp-opening-card__content__badges">
          <hp-badge
            icon="layers"
            class="hp-opening-card__content__badges__badge"
            :content="opening.statistics.templates"
          ></hp-badge>
          <hp-badge
            icon="skills"
            class="hp-opening-card__content__badges__badge"
            :content="opening.statistics.skills.length"
          ></hp-badge>
          <hp-badge
            icon="candidates"
            class="hp-opening-card__content__badges__badge"
            :content="opening.statistics.candidates"
          ></hp-badge>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import HpButton from "@/components/hp-button.vue";
import HpBadge from "@/components/hp-badge.vue";
import HpAbstractAvatar from "@/components/hp-abstract-avatar.vue";
import HpIcon from "@/components/hp-icon.vue";
const props = defineProps({
  opening: {
    type: Object,
    default: () => ({}),
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  isAddCard: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["unarchiveOpening, handleAddNew"]);

const splash = defineAsyncComponent(() =>
  import(
    /* @vite-ignore */ `../../assets/abstracts/covers/cover_${props.opening.artwork}.svg`
  )
);

const containerClasses = computed(() => {
  return {
    "hp-opening-card": true,
    "hp-opening-card--add-new": props.isAddCard,
    "hp-opening-card--selected": props.isSelected,
    "hp-opening-card--archived": props.isArchived,
  };
});
</script>

<style lang="scss">
.hp-opening-card {
  height: 236px;
  width: 264px;
  list-style: none;
  cursor: pointer;
  border-radius: $border-radius-lg;
  border: 1px solid var(--color-border);
  &--add-new {
    cursor: default;
  }
  &--archived {
    cursor: default;
    .hp-opening-card__content {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  &--selected {
    background-color: var(--color-panel);
  }
  &:hover {
    box-shadow: inset 0px 0px 4px rgba(33, 44, 51, 0.01),
      inset 0px 0px 48px rgba(33, 44, 51, 0.03);
  }
  &__splash {
    flex-shrink: 0;
    min-height: 84px;
    &__image {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
  }
  &__content-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &__content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    &__name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    &__description {
      flex: 1;
      color: var(--color-text-secondary);
    }
    &__badges {
      display: flex;
      &__badge {
        margin-right: 6px;
      }
    }
  }
  &__archived {
    display: flex;
    flex-direction: column;
  }
  &__archived-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
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
