import { TaskDto, TaskListDto } from "@/types";
import { handleResponse } from "@/utils/resHandler";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  // return task list
  getLists: async (): Promise<TaskListDto[]> => {
    const res = await fetch(`${API_BASE_URL}/task-lists`);
    return handleResponse(res);
  },

  // create new task list
  createList: async (title: string): Promise<TaskListDto> => {
    const res = await fetch(`${API_BASE_URL}/task-lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: null, tasks: [] }),
    });
    return handleResponse(res);
  },

  // delete task list
  deleteList: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/task-lists/${id}`, { method: "DELETE" });
  },

  // return task by id
  getTasks: async (listId: string): Promise<TaskDto[]> => {
    const res = await fetch(`${API_BASE_URL}/task-lists/${listId}/tasks`);
    return handleResponse(res);
  },

  // create new task
  createTask: async (listId: string, task: TaskDto): Promise<TaskDto> => {
    const res = await fetch(`${API_BASE_URL}/task-lists/${listId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return handleResponse(res);
  },

  // update task by id
  updateTask: async (
    listId: string,
    taskId: string,
    task: TaskDto
  ): Promise<TaskDto> => {
    const res = await fetch(
      `${API_BASE_URL}/task-lists/${listId}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      }
    );
    return handleResponse(res);
  },

  // delete task by id
  deleteTask: async (listId: string, taskId: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/task-lists/${listId}/tasks/${taskId}`, {
      method: "DELETE",
    });
  },
};
