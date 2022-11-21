<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";

import IconButton from "../components/button/IconButton.vue";
import { useTaskStore } from "../stores/task";
import { ICONS, IconSpin } from "../components/icons";

const notification = useNotification();
const task = useTaskStore();

const { updateTask, getTaskByID, getTaskDetailState, updateTaskState } = task;

const title = ref("");
const id = ref(null);

id.value = useRoute().query.id;

onMounted(async () => {
  await getTaskByID(id.value);
  title.value = getTaskDetailState.data?.title;
});

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
</script>

<template>
  <div
    class="flex flex-col items-center min-w-full h-24 pb-1 bg-white rounded-md shadow-sm justify-between"
  >
    <h1 class="text-2xl font-bold">Update task</h1>
    <IconButton v-if="getTaskDetailState.isRequesting" :is-disable="true">
      <IconSpin />
    </IconButton>
    <template v-else>
      <h3 v-if="getTaskDetailState.error">
        Failed to load data with task id: {{ id }}
      </h3>
      <div class="flex flex-row justify-between w-1/2" v-else>
        <input
          v-model="title"
          placeholder="Inter task title"
          class="w-3/4 border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
        />
        <IconButton
          @handle-onclick="updateTaskTitle"
          :isDisable="updateTaskState.isRequesting"
          :icon-path="ICONS.UPLOAD"
        >
          <IconSpin v-if="updateTaskState.isRequesting" />
        </IconButton>
      </div>
    </template>
  </div>
</template>
