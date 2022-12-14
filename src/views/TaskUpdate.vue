<script setup>
import { ref, onMounted, toRefs } from "vue";
import { useRoute } from "vue-router";

import Button from "../components/button/Button.vue";
import { useTaskStore } from "../stores/task";
import { ICONS, IconSpin, Icon } from "../components/icons";
import { handleNotification } from "../utils/notification.js";

const task = useTaskStore();

const { updateTask, getTaskByID, getTaskDetailState, updateTaskState } = task;
const getTaskDetailStateRef = toRefs(getTaskDetailState);
const {
  data: gettingData,
  isRequesting: isGetting,
  error: gettingErr,
} = getTaskDetailStateRef;
const updateTaskStateRef = toRefs(updateTaskState);
const {
  data: updatedData,
  isRequesting: isUpdating,
  error: updatingErr,
} = updateTaskStateRef;

const title = ref("");
const id = ref(null);

id.value = useRoute().query.id;

onMounted(async () => {
  await getTaskByID(id.value);
  title.value = gettingData.value?.title;
});

async function updateTaskTitle() {
  await updateTask(id.value, title.value);
  handleNotification(
    updatingErr.value,
    `${updatedData.value?.title} has been updated!`,
    `${updatedData.value?.title} hasn't been updated!`
  );
}
</script>

<template>
  <div
    class="flex flex-col items-center min-w-full h-24 pb-1 bg-white rounded-md shadow-sm justify-between"
  >
    <h1 class="text-2xl font-bold">Update task</h1>
    <Icon v-if="isGetting">
      <IconSpin />
    </Icon>
    <template v-else>
      <h3 v-if="gettingErr">Failed to load data with task id: {{ id }}</h3>
      <div class="flex flex-row justify-between w-1/2" v-else>
        <input
          v-model="title"
          placeholder="Inter task title"
          class="w-3/4 border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
        />
        <Button @handle-onclick="updateTaskTitle" :isDisable="isUpdating">
          <Icon :icon-path="ICONS.UPLOAD">
            <IconSpin v-if="isUpdating" />
          </Icon>
        </Button>
      </div>
    </template>
  </div>
</template>
