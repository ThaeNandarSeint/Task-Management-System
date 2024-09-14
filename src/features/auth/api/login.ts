import { api } from "@/libs/axios";
import { LoginDto } from "..";
import { User } from "@/features/user";
import { useMutation } from "@tanstack/react-query";

export const login = async (data: LoginDto) => {
  return api
    .post<{ payload: { user: User; token: string } }>("/auth/login", data)
    .then((res) => res.data);
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
