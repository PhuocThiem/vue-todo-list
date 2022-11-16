import http from "../services/http";
import { ENDPOINT } from "../constant/endpoint";

const { TASK } = ENDPOINT;

export class TaskAPI {
  static createNewTaskAPI(title) {
    return http.post(TASK, { title });
  }
  static getTasksAPI() {
    return http.get(TASK);
  }
  static updateTaskAPI({ id, title }) {
    return http.put(`${TASK}/${id}`, { title });
  }
  static updateTaskStatusAPI({ id, isCompleted }) {
    return http.put(`${TASK}/${id}`, { isCompleted });
  }
  static deleteTaskAPI(taskID) {
    return http.delete(`${TASK}/${taskID}`);
  }
}
