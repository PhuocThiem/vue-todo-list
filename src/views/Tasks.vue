<script setup>
import { onMounted, watchEffect, computed, watch } from "vue";
import { useTaskStore } from "../stores/task";
import TaskItem from "../components/TaskItem.vue";
import IconButton from "../components/button/IconButton.vue";
import router from "../router";

const task = useTaskStore();
const {
  createTaskState,
  getTasksState,
  updateTaskState,
  deleteTaskState,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = task;

const { title } = getTasksState.data;

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
    deleteTask.error) &&
    alert(getTasksState?.error);
});
</script>

<template>
  <div class="flex flex-col items-center min-h-fit pt-14">
    <div
      class="flex flex-row justify-center gap-1.5 bg-slate-100 min-w-fit py-3 px-3"
    >
      <div class="flex flex-col justify-start gap-1.5 bg-slate-100">
        <h3>Todo</h3>
        <TaskItem v-for="task in todoTasks" :key="task.id" :task="task" />
      </div>
      <div class="flex flex-col justify-start gap-1.5 bg-slate-100">
        <h3>Completed</h3>
        <TaskItem v-for="task in completedTasks" :key="task.id" :task="task" />
      </div>
      <IconButton @handle-onclick="goToCrateTaskPage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </IconButton>
    </div>
  </div>
</template>
