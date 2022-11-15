<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  console.log("Base URL", BASE_URL)
})

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
