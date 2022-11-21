<script setup>
import { onMounted } from "vue";
import { useNotification } from "@kyvg/vue3-notification";

import { useTaskStore } from "../stores/task";
import TaskItem from "../components/TaskItem.vue";
import IconButton from "../components/button/IconButton.vue";
import { ICONS } from "../components/icons";
import router from "../router";

const notification = useNotification();
const task = useTaskStore();

const { getTasksState, getTasks, getTodoTasks, getCompletedTasks } = task;

onMounted(async () => {
  await getTasks();
  if (getTasksState.error) {
    notification.notify({
      type: "error",
      title: "Failed to load data!",
    });
  }
});

function goToCrateTaskPage() {
  router.push({ path: "tasks/create" });
}
</script>

<template>
  <div class="flex flex-col items-center min-h-fit pt-14">
    <div class="flex flex-row justify-between bg-slate-100 w-4/6 py-3 px-3">
      <div class="flex flex-col justify-start gap-1.5 bg-slate-100 w-5/12">
        <h3 class="text-lg font-semibold">Todo</h3>
        <TaskItem v-for="task in getTodoTasks()" :key="task.id" :task="task" />
      </div>
      <div class="flex flex-col justify-start gap-1.5 bg-slate-100 w-5/12">
        <h3 class="text-lg font-semibold">Done</h3>
        <TaskItem
          v-for="task in getCompletedTasks()"
          :key="task.id"
          :task="task"
        />
      </div>
      <IconButton
        @handle-onclick="goToCrateTaskPage"
        :icon-path="ICONS.ADDITION"
      />
    </div>
  </div>
</template>
