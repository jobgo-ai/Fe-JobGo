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
        <hp-button label="Create new"></hp-button>
      </div>
    </div>
    <div v-else>
      <component
        :is="splash"
        role="img"
        :alt="splash"
        v-if="!isArchived"
        class="hp-opening-card__splash"
      />
      <div class="hp-opening-card__archived-header" v-else>
        <component
          :is="avatar"
          role="img"
          :alt="avatar"
          v-if="isArchived"
          class="hp-opening-card__avatar"
        />
        <hp-button label="Restore"> </hp-button>
      </div>
      <div class="hp-opening-card__content">
        <h4 class="hp-opening-card__content__name">{{ opening.name }}</h4>
        <p class="hp-opening-card__content__description">
          {{ opening.description }}
        </p>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import HpButton from "@/components/hp-button.vue";
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

const splash = computed(() => {
  return defineAsyncComponent(() =>
    import(
      /* @vite-ignore */ `../assets/abstracts/covers/cover_${
        Math.floor(Math.random() * 10) + 1
      }.svg`
    )
  );
});

const avatar = computed(() => {
  return defineAsyncComponent(() =>
    import(
      /* @vite-ignore */ `../assets/abstracts/avatars/avatar_${
        Math.floor(Math.random() * 10) + 1
      }.svg`
    )
  );
});

const containerClasses = computed(() => {
  return {
    "hp-opening-card": true,
    "hp-opening-card--selected": props.isSelected,
    "hp-opening-card--archived": props.isArchived,
  };
});
</script>

<style lang="scss">
.hp-opening-card {
  height: 236px;
  width: 264px;
  cursor: pointer;
  list-style: none;
  border-radius: 12px;
  border: 1px solid var(--color-border-subtle);
  overflow: hidden;
  transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  &--archived {
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
    height: 84px;
  }
  &__content {
    padding: 16px;
    &__name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    &__description {
      color: var(--color-text-secondary);
    }
  }
  &__archived-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }
  &__avatar {
    height: 40px;
    width: 40px;
    border-radius: 12px;
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
      border-radius: 12px;
      margin-bottom: 16px;
    }
  }
}
</style>
