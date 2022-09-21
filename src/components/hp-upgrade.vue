<template>
  <router-link to="/billing">
    <div class="hp-upgrade">
      <hp-icon size="14" name="diamond"></hp-icon
      ><span class="hp-upgrade__text">Upgrade</span>
    </div>
  </router-link>
</template>

<script setup>
import HpIcon from "@/components/hp-icon.vue";
</script>

<style lang="scss">
.hp-upgrade {
  background-color: var(--yellow--500);
  color: var(--color-accent-forground);
  display: flex;
  align-items: center;
  border-radius: $border-radius-sm;
  padding: 6px;
  font-size: 12px;
  font-weight: 600;
  &__text {
    margin-left: 2px;
  }
}
</style>
