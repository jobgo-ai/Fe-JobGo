<template>
  <div class="not-found">
    <empty-state class="not-found__empty-state"></empty-state>
    <div class="not-found__text">
      <span class="not-found__404">404</span>
      <div class="not-found__text-1">
        What you are looking for doesn't exist
      </div>
      <div>
        we recommend you head back
        <router-link class="not-found__link" to="/">home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import EmptyState from "@/assets/abstracts/empty-state.svg";
</script>

<style lang="scss">
.not-found {
  @include pageContainer;
  display: flex;
  align-items: center;
  &__image {
    width: 50%;
  }
  &__text {
    width: 50%;
    @include text-h3;
    font-weight: 300;
  }
  &__404 {
    font-weight: 500;
    @include text-h1;
    margin-bottom: 16px;
    color: var(--color-text-primary);
  }
  &__text-1 {
    margin-bottom: 16px;
  }
  &__link {
    text-decoration: underline;
  }
}
</style>
