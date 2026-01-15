

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskStatus = 'OPEN' | 'CLOSED';

export interface TaskDto {
  id?: string; 
  title: string;
  description?: string;
  dueDate?: string; 
  priority: Priority;
  status: TaskStatus;
}

export interface TaskListDto {
  id: string;
  title: string;
  description?: string;
  count?: number;
  progress?: number;
  tasks?: TaskDto[];
}