export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type GetTasksQuery = {
  page?: number;
  skip?: number;
  limit?: number;
  search?: string;
};
