<script setup>
import { onMounted, watchEffect, computed, watch } from "vue";

import { useTaskStore } from "../stores/task";
import TaskItem from "../components/TaskItem.vue";
import IconButton from "../components/button/IconButton.vue";
import { IconAddition } from "../components/icons";
import router from "../router";

const task = useTaskStore();
const {
  createTaskState,
  getTasksState,
  updateTaskState,
  deleteTaskState,
  getTasks,
} = task;

onMounted(() => {
  getTasks();
});

const todoTasks = computed(() => {
  return getTasksState?.data?.filter((task) => !task.isCompleted);
});

const completedTasks = computed(() => {
  return getTasksState?.data?.filter((task) => task.isCompleted);
});

function goToCrateTaskPage() {
  router.push({ path: "tasks/create" });
}

watchEffect(() => {
  (getTasksState?.error ||
    createTaskState.error ||
    updateTaskState.error ||
    deleteTaskState.error) &&
    alert(getTasksState?.error);
});
</script>

<template>
  <div class="flex flex-col items-center min-h-fit pt-14">
    <div class="flex flex-row justify-between bg-slate-100 w-4/6 py-3 px-3">
      <div class="flex flex-col justify-start gap-1.5 bg-slate-100 w-5/12">
        <h3 class="text-lg font-semibold">Todo</h3>
        <TaskItem v-for="task in todoTasks" :key="task.id" :task="task" />
      </div>
      <div class="flex flex-col justify-start gap-1.5 bg-slate-100 w-5/12">
        <h3 class="text-lg font-semibold">Done</h3>
        <TaskItem v-for="task in completedTasks" :key="task.id" :task="task" />
      </div>
      <IconButton @handle-onclick="goToCrateTaskPage">
        <IconAddition />
      </IconButton>
    </div>
  </div>
</template>
