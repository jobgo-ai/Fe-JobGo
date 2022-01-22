<template>
  <div class="hp-breadcrumbs">
    <transition-group name="list" class="hp-breadcrumbs__list" tag="ol">
      <li class="hp-breadcrumbs__crumb" v-for="(crumb, i) in crumbs" :key="i">
        <hp-icon
          class="hp-breadcrumbs__crumb__icon"
          name="chevron-right"
        ></hp-icon>
        <router-link :to="crumb.to">{{ crumb.label }}</router-link>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import HpIcon from "@/components/hp-icon.vue";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

const { crumbs } = useBreadcrumbs();
</script>

<style lang="scss" scoped>
.hp-breadcrumbs {
  &__list {
    display: flex;
  }
  &__crumb {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 24px;
    margin-right: 2px;
    letter-spacing: -0.015em;
    color: var(--color-text-secondary);
    &:last-child {
      font-weight: 900;
      color: var(--color-text-primary);
    }
    &:first-child {
      .hp-breadcrumbs__crumb__icon {
        display: none;
      }
    }
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
