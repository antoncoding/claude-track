export interface Task {
  id: string;
  description: string;
  priority: number;
  completed: boolean;
  isCurrent: boolean;
}

export interface TodoData {
  projectName: string;
  currentTask: Task | null;
  tasks: Task[];
  metadata: {
    total: number;
    completed: number;
    progress: number;
  };
}

export interface UpdateTodosRequest {
  tasks: Task[];
}
