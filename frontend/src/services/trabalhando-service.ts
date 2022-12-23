import axios, { AxiosInstance } from 'axios';

export type ProjectId = number
export type TaskId = number

interface PhoenixResponse<T> {
  data: T
}

export type TaskInputs = {
  name: string,
  status: string,
  description: string,
};

export type WorkSpanInputs = {
  startDate: string,
  endDate: string,
  description: string,
};

export interface Task {
  id: TaskId,
  project_id: ProjectId,
  name: string,
  status: 'todo' | 'doing' | 'done'
  description: string
}

export interface WorkSpan {
  id: string,
  task_id: TaskId,
  end_date: string
  start_date: string
  description: string
}

export interface CreateWorkSpan {
  task_id: TaskId,
  end_date: string
  start_date: string
  description: string
}

export interface Project {
  id: ProjectId,
  name: string,
  hour_value: number
}

class TrabalhandoService {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:4000/api/',
      timeout: 1000
    });
  }

  async getProjectById(id: ProjectId): Promise<Project> {
    return await this.performGet<Project>(`/projects/${id}`);
  }

  async getProjects(): Promise<Project[]> {
    return await this.performGet<Project[]>('/projects');
  }

  async getProjectTasks(projectId: ProjectId): Promise<Task[]> {
    return await this.performGet<Task[]>(`/tasks?project_id=${projectId}`);
  }

  async getTaskById(taskId: TaskId): Promise<Task> {
    return await this.performGet<Task>(`/tasks/${taskId}`);
  }

  async getTaskWorkSpans(taskId: TaskId): Promise<WorkSpan[]> {
    return await this.performGet<WorkSpan[]>(`/work-spans?task_id=${taskId}`);
  }

  async deleteWorkSpan(workSpanId: string) {
    return await this.axios.delete(`/work-spans/${workSpanId}`)
  }

  async updateTask(taskId: string, data: TaskInputs): Promise<Task> {
    const response = await this.axios.put(`/tasks/${taskId}`, { task: data })
    return response.data.data
  }

  async createTask(projectId: string, data: TaskInputs): Promise<Task> {
    const response = await this.axios.post(`/tasks`, { project_id: projectId, task: data })
    return response.data.data
  }

  // TODO: learn more about TS error handling
  async createWorkSpan(span: CreateWorkSpan): Promise<WorkSpan> {
    const response = await this.axios.post(`/work-spans`, { task_id: span.task_id, work_span: span })
    return response.data.data
  }

  private async performGet<T>(route: string) {
    const response = await this.axios.get<PhoenixResponse<T>>(route)
    return response.data.data // unwrap phoenix response
  }
}

export const trabalhandoService = new TrabalhandoService();

