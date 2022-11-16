<script setup>
import { ref } from "vue";
import IconButton from "../components/button/IconButton.vue";
import { useTaskStore } from "../stores/task";

const task = useTaskStore();
const { createTask } = task;

const title = ref("");

function createNewTask() {
  createTask(title.value);
}
</script>

<template>
  <div
    class="flex flex-col items-center min-w-full h-24 pb-1 bg-white rounded-md shadow-sm justify-between"
  >
    <h1 class="text-2xl font-bold">Update task</h1>
    <input v-model="title" placeholder="Inter task title" />
    <IconButton @handle-onclick="createNewTask">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
          clip-rule="evenodd"
        />
      </svg>
    </IconButton>
  </div>
</template>
