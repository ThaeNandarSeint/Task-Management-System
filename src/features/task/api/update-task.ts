import { api } from "@/libs/axios";
import { Task, TaskDto } from "..";
import { useMutation } from "@tanstack/react-query";

export const updateTask = async ({ id, ...data }: TaskDto & { id: number }) =>
  api.patch<Task>(`/tasks/${id}`, data).then((res) => res.data);

export const useUpdateTask = () =>
  useMutation({
    mutationFn: updateTask,
  });
