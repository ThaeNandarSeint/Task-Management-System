import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { UserDto } from "../schemas";
import { User } from "../types";

export const updateProfile = async (data: Partial<UserDto>) =>
  api.patch<User>("/users/me", data).then((res) => res.data);

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfile,
  });
