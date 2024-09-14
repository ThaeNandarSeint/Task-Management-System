import { api } from "@/libs/axios";
import { RegisterDto } from "..";
import { User } from "@/features/user";
import { useMutation } from "@tanstack/react-query";

export const register = async (data: RegisterDto) => {
  return api
    .post<{
      user: User;
    }>("/auth/register", data)
    .then((res) => res.data);
};

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });
