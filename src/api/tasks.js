import http from "../services/http";
import { ENDPOINT } from "../constant/endpoint";

const { TASK } = ENDPOINT;

export class TaskAPI {
  static createNewTaskAPI(task) {
    return http.post(TASK, task);
  }
  static getTasksAPI() {
    return http.get(TASK);
  }
}
