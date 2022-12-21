import axios, { AxiosInstance } from 'axios';

export type ProjectId = string

interface PhoenixResponse<T> {
  data: T
}

export interface WorkSpan {
  id: string,
  project_id: ProjectId,
  end_date: Date
  start_date: Date
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

  async getProjects(): Promise<Project[]> {
    return await this.performGet<Project[]>('/projects');
  }

  private async performGet<T>(route: string) {
    const response = await this.axios.get<PhoenixResponse<T>>(route)
    return response.data.data // unwrap phoenix response
  }
}

export const trabalhandoService = new TrabalhandoService();

