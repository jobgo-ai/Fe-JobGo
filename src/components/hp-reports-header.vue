<template>
  <div class="hp-reports-header">
    <div class="hp-reports-header__left">
      <a
        class="hp-reports-header__logo"
        target="_blank"
        href="https://hireproof.io/"
        ><Logo></Logo
      ></a>
    </div>
  </div>
</template>

<script setup>
import Logo from "@/assets/logo.svg";
</script>

<style lang="scss" scoped>
.hp-reports-header {
  width: 100%;
  display: flex;
  padding: 12px 12px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background);
  &__logo {
    display: flex;
    width: 32px;
  }
}
</style>
