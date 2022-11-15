<template>
  <div class="about">
    <h1>List of the page</h1>
    <div v-if="!error">
      <li v-for="task in listOfTasks" :key="task.id">{{ task.title }}</li>
    </div>
    <span v-else>{{ error }}</span>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { TaskAPI } from "../api/tasks";

const listOfTasks = ref([]);
const error = ref("");

onMounted(async () => {
  try {
    listOfTasks.value = await TaskAPI.getTasksAPI();
  } catch (error) {
    error.value = error;
  }
});
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
