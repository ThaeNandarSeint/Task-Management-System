import { api } from "@/libs/axios";
import { RegisterDto } from "..";
import { User } from "@/features/user";
import { useMutation } from "@tanstack/react-query";

export const register = async (data: RegisterDto) => {
  const { userAgent: deviceId, platform: deviceOS } = navigator;
  return api
    .post<{
      user: User;
    }>("/auth/customers/register", { ...data, deviceId, deviceOS })
    .then((res) => res.data);
};

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });
