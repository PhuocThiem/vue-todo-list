<script setup>
import { watch, ref } from "vue";
import moment from "moment";
import { useNotification } from "@kyvg/vue3-notification";

import IconButton from "../components/button/IconButton.vue";
import router from "../router";
import { useTaskStore } from "../stores/task";
import { ICONS, IconSpin } from "../components/icons";

const notification = useNotification();

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

watch(selectedTaskID, () => {
  getTasks();
});

async function handleDeleteTask(id) {
  deleteID.value = id;
  await deleteTask(id);
  selectedTaskID.value = id;
  if (deleteTaskState.error) {
    notification.notify({
      type: "error",
      title: `${deleteTaskState.data?.title} state hasn't been deleted!`,
    });
    return;
  }
  notification.notify({
    type: "success",
    title: `${deleteTaskState.data?.title} has been deleted!`,
  });
}

async function handleUpdateTaskStatus(id, isCompleted) {
  updateID.value = id;
  await updateTaskStatus({ id, isCompleted });
  selectedTaskID.value = id;
  if (updateTaskStatusState.error) {
    notification.notify({
      type: "error",
      title: `${updateTaskStatusState.data?.title} state hasn't been updated!`,
    });
    return;
  }
  notification.notify({
    type: "success",
    title: `${updateTaskStatusState.data?.title} has been moved to ${
      updateTaskStatusState.data?.isCompleted ? "Done" : "Todo"
    }`,
  });
}

function goToUpdateTaskPage(id) {
  router.push({ path: "/tasks/update", query: { id } });
}
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
          :isDisable="
            updateTaskStatusState.isRequesting && updateID === task.id
          "
          :icon-path="!task?.isCompleted ? ICONS.CHECKED : ICONS.CANCEL"
        >
          <IconSpin
            v-if="updateTaskStatusState.isRequesting && updateID === task.id"
          />
        </IconButton>
        <IconButton
          @handle-onclick="goToUpdateTaskPage(task.id)"
          :icon-path="ICONS.UPDATE"
        />
        <IconButton
          @handle-onclick="handleDeleteTask(task.id)"
          :isDisable="deleteTaskState.isRequesting && deleteID === task.id"
          :icon-path="ICONS.DELETE"
        >
          <IconSpin
            v-if="deleteTaskState.isRequesting && deleteID === task.id"
          />
        </IconButton>
      </div>
    </div>
  </div>
</template>
