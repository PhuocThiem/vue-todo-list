<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";

import IconButton from "../components/button/IconButton.vue";
import { useTaskStore } from "../stores/task";
import { IconUpload, IconSpin } from "../components/icons";

const task = useTaskStore();
const notification = useNotification();

const { getTaskByID, updateTask, getTaskDetailState, updateTaskState } = task;

const title = ref("");
const id = ref(null);

async function updateTaskTitle() {
  await updateTask(id.value, title.value);
  if (updateTaskState.error) {
    notification.notify({
      type: "error",
      title: `${updateTaskState.data?.title} hasn't been updated!`,
    });
    return;
  }
  notification.notify({
    type: "success",
    title: `${updateTaskState.data?.title} has been updated!`,
  });
}

onMounted(async () => {
  id.value = useRoute().query.id;
  await getTaskByID(id.value);
  title.value = getTaskDetailState.data?.title;
});
</script>

<template>
  <div
    class="flex flex-col items-center min-w-full h-24 pb-1 bg-white rounded-md shadow-sm justify-between"
  >
    <h1 class="text-2xl font-bold">Update task</h1>
    <div class="flex flex-row justify-between w-1/2">
      <input
        v-model="title"
        placeholder="Inter task title"
        class="w-3/4 border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
      />
      <IconButton
        @handle-onclick="updateTaskTitle"
        :isDisable="updateTaskState.isRequesting"
      >
        <IconUpload v-if="!updateTaskState.isRequesting" />
        <IconSpin v-else />
      </IconButton>
    </div>
  </div>
</template>
