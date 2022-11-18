import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { TaskAPI } from "../api/tasks";

export const useTaskStore = defineStore("task", () => {
  const createTaskState = reactive({
    data: null,
    isRequesting: false,
    error: null,
  });

  const getTasksState = reactive({
    data: [],
    isRequesting: false,
    error: null,
  });

  const updateTaskState = reactive({
    data: null,
    isRequesting: false,
    error: null,
  });

  const updateTaskStatusState = reactive({
    data: null,
    isRequesting: false,
    error: null,
  });

  const deleteTaskState = reactive({
    data: null,
    isRequesting: false,
    error: null,
  });

  const getTaskDetailState = reactive({
    data: null,
    isRequesting: false,
    error: null,
  });

  async function createTask(title) {
    return await _handleAsyncFunction(createTaskState, () =>
      TaskAPI.createNewTaskAPI(title)
    );
  }

  function getTasks() {
    _handleAsyncFunction(getTasksState, TaskAPI.getTasksAPI);
  }

  async function updateTask(id, title) {
    return await _handleAsyncFunction(updateTaskState, () =>
      TaskAPI.updateTaskAPI({ id, title })
    );
  }

  async function updateTaskStatus({ id, isCompleted }) {
    return await _handleAsyncFunction(updateTaskStatusState, () =>
      TaskAPI.updateTaskStatusAPI({ id, isCompleted })
    );
  }

  async function deleteTask(id) {
    return await _handleAsyncFunction(deleteTaskState, () =>
      TaskAPI.deleteTaskAPI(id)
    );
  }

  async function getTaskByID(id) {
    return await _handleAsyncFunction(getTaskDetailState, () =>
      TaskAPI.getTaskByIdAPI(id)
    );
  }

  function getTodoTasks() {
    return getTasksState?.data?.filter((task) => !task.isCompleted);
  }

  function getCompletedTasks() {
    return getTasksState?.data?.filter((task) => task.isCompleted);
  }

  async function _handleAsyncFunction(state, asyncFunction) {
    state.isRequesting = true;
    try {
      const res = await asyncFunction();
      state.data = res;
    } catch (error) {
      state.error = error;
    }
    state.isRequesting = false;
  }

  return {
    createTaskState,
    getTasksState,
    updateTaskState,
    deleteTaskState,
    updateTaskStatusState,
    getTaskDetailState,
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTaskByID,
    getTodoTasks,
    getCompletedTasks,
  };
});
