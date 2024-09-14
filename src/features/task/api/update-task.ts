import { api } from "@/libs/axios";
import { Task, TaskDto } from "..";
import { useMutation } from "@tanstack/react-query";

export const updateTask = async ({
  id,
  ...data
}: Partial<TaskDto> & { id: number; isCompleted?: boolean }) =>
  api.patch<Task>(`/tasks/${id}`, data).then((res) => res.data);

export const useUpdateTask = () =>
  useMutation({
    mutationFn: updateTask,
  });
