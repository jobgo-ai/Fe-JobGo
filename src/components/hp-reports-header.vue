<template>
  <div class="hp-reports-header">
    <div class="hp-reports-header__left">
      <a href="https://hireproof.io/"
        ><img class="hp-reports-header__logo" src="@/assets/logo-text.png"
      /></a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.hp-reports-header {
  width: 100%;
  display: flex;
  padding: 12px 0;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background);
  &__logo {
    display: flex;
    width: 148px;
  }
}
</style>
