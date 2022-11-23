<script setup>
import { watch, ref, toRefs } from "vue";
import moment from "moment";

import Button from "./button/Button.vue";
import router from "../router";
import { useTaskStore } from "../stores/task";
import { ICONS, IconSpin, Icon } from "../components/icons";
import { handleNotification } from "../utils/notification";

const tasks = useTaskStore();
const {
  deleteTask,
  getTasks,
  updateTaskStatus,
  deleteTaskState,
  updateTaskStatusState,
} = tasks;

const updateTaskStatusStateRef = toRefs(updateTaskStatusState);
const {
  data: updateData,
  isRequesting: isUpdating,
  error: updateErr,
} = updateTaskStatusStateRef;
const deleteTaskStateRef = toRefs(deleteTaskState);
const {
  data: deleteData,
  isRequesting: isDeleting,
  error: deleteErr,
} = deleteTaskStateRef;

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
  handleNotification(
    deleteErr.value,
    `${deleteData.value?.title} has been deleted!`,
    `${deleteData.value?.title} state hasn't been deleted!`
  );
}

async function handleUpdateTaskStatus(id, isCompleted) {
  updateID.value = id;
  await updateTaskStatus({ id, isCompleted });
  selectedTaskID.value = id;
  handleNotification(
    updateErr.value,
    `${updateData.value?.title} has been moved to ${
      updateData.value?.isCompleted ? "Done" : "Todo"
    }`,
    `${updateData.value?.title} state hasn't been updated!`
  );
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
      :class="[task?.isCompleted ? 'completed' : 'todo']"
    ></div>
    <p class="text-xl px-1">{{ task?.title }}</p>
    <div class="flex flex-row min-w-full justify-between px-1 flex-wrap">
      <p class="text-slate-400">
        Created at: {{ moment(task?.createdAt).format("L") }}
      </p>
      <div class="flex flex-row justify-between w-1/3">
        <Button
          @handle-onclick="handleUpdateTaskStatus(task.id, !task.isCompleted)"
          :isDisable="isUpdating"
        >
          <Icon :icon-path="!task?.isCompleted ? ICONS.CHECKED : ICONS.CANCEL">
            <IconSpin v-if="isUpdating && updateID === task.id" />
          </Icon>
        </Button>
        <Button @handle-onclick="goToUpdateTaskPage(task.id)">
          <Icon :icon-path="ICONS.UPDATE" />
        </Button>
        <Button
          @handle-onclick="handleDeleteTask(task.id)"
          :isDisable="isDeleting"
        >
          <Icon :icon-path="ICONS.DELETE">
            <IconSpin v-if="isDeleting && deleteID === task.id" />
          </Icon>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$green-200: #bbf7d0;
$sky-100: #e0f2fe;

.todo {
  background-color: $sky-100;
}
.completed {
  background-color: $green-200;
}
</style>
