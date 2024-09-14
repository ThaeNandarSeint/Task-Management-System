import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { Task } from "..";

const deleteTask = async (id: number) =>
  api.delete<Task>(`/tasks/${id}`).then((res) => res.data);

export const useDeleteTask = () =>
  useMutation({
    mutationFn: deleteTask,
  });
