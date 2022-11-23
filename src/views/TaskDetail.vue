<script setup>
import { onMounted, toRefs } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";

import { useTaskStore } from "../stores/task";
import { ICONS, IconSpin, Icon } from "../components/icons";

const task = useTaskStore();

const { getTaskByID, getTaskDetailState } = task;
const getTaskDetailStateRef = toRefs(getTaskDetailState);
const { data, isRequesting, error } = getTaskDetailStateRef;

onMounted(() => {
  getTaskByID(useRoute().query.id);
});
</script>

<template>
  <div
    class="flex flex-col items-center min-w-full h-24 pb-1 bg-white rounded-md shadow-sm justify-between"
  >
    <h1 class="text-2xl font-bold">Task info</h1>
    <Icon v-if="isRequesting">
      <IconSpin />
    </Icon>
    <template v-else>
      <h3 v-if="error">Failed to load data with task id: {{ id }}</h3>
      <div v-else class="flex flex-row justify-between w-1/2">
        <p>Title: {{ data?.title }}</p>
        <p>status: {{ data?.isCompleted ? "Done" : "Todo"}}</p>
        <p>Create at: {{ moment(data?.createdAt).format("L") }}</p>
      </div>
    </template>
  </div>
</template>
