<script setup>
import { onMounted, watchEffect, watch, ref } from "vue";
import moment from "moment";

import IconButton from "../components/button/IconButton.vue";
import router from "../router";
import { useTaskStore } from "../stores/task";
import {
  IconChecked,
  IconCancel,
  IconUpdate,
  IconDelete,
  IconSpin,
} from "../components/icons";

const tasks = useTaskStore();
const {
  deleteTask,
  getTasks,
  updateTaskStatus,
  deleteTaskState,
  updateTaskStatusState,
} = tasks;

const selectedTaskID = ref(null);
const deleteID = ref(null);
const updateID = ref(null);

defineProps({
  task: {
    id: Number,
    title: String,
    createdAt: String,
    isCompleted: Boolean,
  },
});

async function handleDeleteTask(id) {
  deleteID.value = id;
  await deleteTask(id);
  selectedTaskID.value = id;
}

async function handleUpdateTaskStatus(id, isCompleted) {
  updateID.value = id;
  await updateTaskStatus({ id, isCompleted });
  selectedTaskID.value = id;
}

function goToUpdateTaskPage(id) {
  router.push({ path: "/tasks/update", query: { id } });
}

watch(selectedTaskID, () => {
  getTasks();
});
</script>

<template>
  <div
    class="flex flex-col items-start max-w-full min-h-[94px] pb-1 pt-0 bg-white rounded-md shadow-sm justify-between"
  >
    <div
      class="h-1.5 bg-black min-w-full"
      :class="[task?.isCompleted ? 'bg-green-200' : 'bg-sky-100']"
    />
    <p class="text-xl px-1">{{ task?.title }}</p>
    <div class="flex flex-row min-w-full justify-between px-1 flex-wrap">
      <p class="text-slate-400">
        Created at: {{ moment(task?.createdAt).format("L") }}
      </p>
      <div class="flex flex-row justify-between w-1/3">
        <IconButton
          @handle-onclick="handleUpdateTaskStatus(task.id, !task.isCompleted)"
          :isDisable="updateTaskStatusState.isRequesting"
        >
          <IconSpin
            v-if="updateTaskStatusState.isRequesting && updateID === task.id"
          />
          <span v-else>
            <IconChecked v-if="!task?.isCompleted" />
            <IconCancel v-else />
          </span>
        </IconButton>
        <IconButton @handle-onclick="goToUpdateTaskPage(task.id)">
          <IconUpdate />
        </IconButton>
        <IconButton
          @handle-onclick="handleDeleteTask(task.id)"
          :isDisable="deleteTaskState.isRequesting"
        >
          <IconSpin
            v-if="deleteTaskState.isRequesting && deleteID === task.id"
          />
          <IconDelete v-else />
        </IconButton>
      </div>
    </div>
  </div>
</template>
