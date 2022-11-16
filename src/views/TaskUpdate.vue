<script setup>
import { onMounted, watchEffect, ref } from "vue";
import IconButton from "../components/button/IconButton.vue";
import moment from "moment";
</script>

<template>
  <div
    class="flex flex-col items-start w-96 h-24 pb-1 bg-white rounded-md shadow-sm justify-between"
  >
    <h1>Update task title</h1>
  </div>
</template>
