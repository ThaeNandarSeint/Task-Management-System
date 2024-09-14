import { api } from "@/libs/axios";
import { Task, TaskDto } from "..";
import { useMutation } from "@tanstack/react-query";

export const createTask = async (data: TaskDto) =>
  api.post<Task>("/tasks", data).then((res) => res.data);

export const useCreateTask = () =>
  useMutation({
    mutationFn: createTask,
  });
