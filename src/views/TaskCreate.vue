<script setup>
import { ref } from "vue";
import IconButton from "../components/button/IconButton.vue";
import { useTaskStore } from "../stores/task";
import { IconSpin, IconAddition } from "../components/icons";
import router from "../router";

const task = useTaskStore();
const { createTask, createTaskState } = task;

const title = ref("");

async function createNewTask() {
  await createTask(title.value);
  if (createTaskState.error) {
    return;
  }
  router.replace({ path: "/tasks" });
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
      <IconButton
        @handle-onclick="createNewTask"
        :isDisable="createTaskState.isRequesting"
      >
        <IconAddition v-if="!createTaskState.isRequesting" />
        <IconSpin v-else />
      </IconButton>
    </div>
  </div>
</template>
