<template>
  <div class="hp-counter">
    <div class="hp-counter__count">
      <span class="hp-counter__count-number">{{ count }}</span>
    </div>
    <button @click="handleCountIncrement">Increase</button>
    <button @click="handleCountDecrement">Decrease</button>
  </div>
</template>

<script setup>
// Vendor
import { ref } from "vue";

const count = ref(5);

const handleCountIncrement = () => {
  count.value++;
};
const handleCountDecrement = () => {
  count.value--;
};
</script>
