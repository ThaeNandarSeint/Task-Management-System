import { api } from "@/libs/axios";
import { GetTasksQuery, Task } from "..";
import { useInfiniteQuery } from "@tanstack/react-query";

const getTasks = async ({ page = 1, limit = 9, ...params }: GetTasksQuery) =>
  api
    .get<{
      payload: { tasks: Task[]; count: number };
    }>("/tasks", {
      params: { ...params, skip: (page - 1) * 9, limit },
    })
    .then((res) => res.data);

export const useGetTasks = () =>
  useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: ({ pageParam = 1 }) => getTasks({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.payload.tasks.length === 9 ? allPages.length + 1 : undefined,
  });
