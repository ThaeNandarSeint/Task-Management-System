import { api } from "@/libs/axios";
import { GetTasksQuery, Task } from "..";
import { useQuery } from "@tanstack/react-query";

const getTasks = async (params: GetTasksQuery) =>
  api
    .get<{
      data: Task[];
      total: number;
    }>("/tasks", {
      params,
    })
    .then((res) => res.data);

export const useGetTasks = (queries: GetTasksQuery) =>
  useQuery({
    queryKey: ["tasks", queries],
    queryFn: () => getTasks(queries),
  });
