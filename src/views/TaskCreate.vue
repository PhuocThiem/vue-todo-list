<script setup>
import { ref, toRefs } from "vue";

import Button from "../components/button/Button.vue";
import { useTaskStore } from "../stores/task";
import { ICONS, IconSpin, Icon } from "../components/icons";
import { handleNotification } from "../utils/notification";

const task = useTaskStore();
const { createTask, createTaskState } = task;

//convert reactive object to ref to using destructing
const createTaskStateRef = toRefs(createTaskState);
const { data, isRequesting, error } = createTaskStateRef;

const title = ref("");

async function createNewTask() {
  await createTask(title.value);
  handleNotification(
    error.value,
    `${data.value.title} has been updated!`,
    `${data.value.title} hasn't been created!`
  );
}
</script>

<template>
  <div
    class="flex flex-col items-center min-w-full h-24 pb-1 bg-white rounded-md shadow-sm justify-between"
  >
    <h1 class="text-2xl font-bold">Add a new task</h1>
    <div class="flex flex-row justify-between w-1/2">
      <input
        v-model="title"
        placeholder="Input task title"
        class="w-3/4 border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
      />
      <Button @handle-onclick="createNewTask" :isDisable="isRequesting">
        <Icon :icon-path="ICONS.ADDITION">
          <IconSpin v-if="isRequesting" />
        </Icon>
      </Button>
    </div>
  </div>
</template>
