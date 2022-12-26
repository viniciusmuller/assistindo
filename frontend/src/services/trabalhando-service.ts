import axios, { AxiosInstance } from 'axios';

export type ProjectId = string
export type TaskId = string

interface PhoenixResponse<T> {
  data: T
}

export type ProjectInputs = {
  name: string,
  paid: boolean,
  hour_value: number,
  currency_prefix: string,
};

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
  description: string,
  total_hours: string
}

export interface WorkSpan {
  id: string,
  task_id: TaskId,
  end_date: string
  start_date: string
  description: string
}

export interface Project {
  id: ProjectId,
  name: string,
  paid: boolean,
  hour_value: string
  currency_prefix: string
  // virtual
  total_hours: string
  pending_tasks: number,
  in_progress_tasks: number,
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

  async createProject(data: ProjectInputs): Promise<Project> {
    const response = await this.axios.post(`/projects`, { project: data })
    return response.data.data
  }

  async updateProject(id: ProjectId, data: ProjectInputs): Promise<Project> {
    const response = await this.axios.put(`/projects/${id}`, { project: data })
    return response.data.data
  }

  async deleteProject(id: ProjectId) {
    return await this.axios.delete(`/projects/${id}`)
  }

  // TODO: use axios middleware to convert between camel and snake case
  async createWorkSpan(taskId: TaskId, span: WorkSpanInputs): Promise<WorkSpan> {
    const response = await this.axios.post(`/work-spans`, {
      task_id: taskId, work_span: {
        end_date: span.endDate,
        start_date: span.startDate,
        description: span.description
      }
    })
    return response.data.data
  }

  private async performGet<T>(route: string) {
    const response = await this.axios.get<PhoenixResponse<T>>(route)
    return response.data.data // unwrap phoenix response
  }
}

export const trabalhandoService = new TrabalhandoService();

