<template>
  <transition-group class="hp-toast" tag="ol" name="list">
    <li v-for="toast in toastQueue" :key="toast.id" class="hp-toast__content">
      <div class="hp-toast__content__container">
        <hp-icon
          :class="`
            hp-toast__content__container__icon
            hp-toast__content__container__icon--${toast.type}
          `"
          v-if="toast.icon"
          :name="toast.icon"
        ></hp-icon>
        <div
          v-if="!toast.title"
          class="hp-toast__content__container__message--default"
        >
          {{ toast.message }}
        </div>
        <div v-else class="hp-toast__content__container__message">
          <p
            class="hp-toast__content__container__message__title"
            v-if="toast.title"
          >
            {{ toast.title }}
          </p>
          <p
            class="hp-toast__content__container__message__subtitle"
            v-if="toast.message"
          >
            {{ toast.message }}
          </p>
        </div>
      </div>
      <hp-icon
        @click="dismissToast(toast.id)"
        class="hp-toast__content__container__close-icon"
        name="cross-circle"
      ></hp-icon>
    </li>
  </transition-group>
</template>

<script setup>
import HpIcon from "@/components/hp-icon.vue";
import useToast from "@/composables/useToast.js";
const { toastQueue, dismissToast } = useToast();
</script>

<styles lang="scss" scoped>
.hp-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 380px;
  &__content {
    position: relative;
    padding: 15px;
    background-color: var(--color-background);
    border: 1px solid var(--color-border-subtle);
    border-radius: $border-radius-lg;
    box-shadow: 0px 16px 24px rgba(33, 44, 51, 0.06),
      0px 2px 6px rgba(33, 44, 51, 0.04), 0px 0px 1px rgba(33, 44, 51, 0.04);
    margin-bottom: 16px;
    &__container {
      display: flex;
      padding-right: 28px;
      &__icon {
        margin-right: 16px;
        color: var(--color-text-secondary);
        &--default {
          color: var(--color-text-secondary);
        }
        &--negative {
          color: var(--color-error);
        }
        &--positive {
          color: var(--color-forground-positive);
        }
      }
      &__message {
        display: flex;
        flex-direction: column;
        &__default {
          font-size: 14px;
          line-height: 20px;
          color: var(--color-text-primary);
        }
        &__title {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
        }
        &__subtitle {
          font-size: 14px;
          line-height: 20px;
          opacity: 0.6;
        }
      }
      &__close-icon {
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 15px;
        color: var(--color-text-secondary);
      }
    }
  }
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 0.15s cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</styles>
