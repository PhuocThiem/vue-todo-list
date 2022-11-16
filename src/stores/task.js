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

  const deleteTaskState = reactive({
    data: null,
    isRequesting: false,
    error: null,
  });

  function createTask(title) {
    _handleAsyncFunction(createTask, () => TaskAPI.createNewTaskAPI(title));
  }

  function getTasks() {
    _handleAsyncFunction(getTasksState, TaskAPI.getTasksAPI);
  }

  function updateTask({ id, title }) {
    _handleAsyncFunction(updateTask, () =>
      TaskAPI.updateTaskAPI({ id, title })
    );
  }

  async function deleteTask(id) {
    return await _handleAsyncFunction(deleteTask, () => TaskAPI.deleteTaskAPI(id));
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
    createTask,
    getTasks,
    updateTask,
    deleteTask,
  };
});
