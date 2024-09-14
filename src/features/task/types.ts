export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type GetTasksQuery = {
  skip?: number;
  limit?: number;
  search?: string;
};
