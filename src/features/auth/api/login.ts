import { api } from "@/libs/axios";
import { AppleLoginDto, GoogleLoginDto, LoginDto } from "..";
import { User } from "@/features/user";
import { useMutation } from "@tanstack/react-query";

export const login = async (data: LoginDto) => {
  const { userAgent: deviceId, platform: deviceOS } = navigator;
  return api
    .post<{ user: User }>("/auth/customers", { ...data, deviceId, deviceOS })
    .then((res) => res.data);
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const loginWithGoogle = async (data: GoogleLoginDto) => {
  const { userAgent: deviceId, platform: deviceOS } = navigator;
  return api
    .post<{
      user: User;
    }>("/auth/customers/google", { ...data, deviceId, deviceOS })
    .then((res) => res.data);
};

export const useLoginWithGoogle = () =>
  useMutation({
    mutationFn: loginWithGoogle,
  });

export const loginWithApple = async (data: AppleLoginDto) => {
  const { userAgent: deviceId, platform: deviceOS } = navigator;
  return api
    .post<{
      user: User;
    }>("/auth/customers/apple", { ...data, deviceId, deviceOS })
    .then((res) => res.data);
};

export const useLoginWithApple = () =>
  useMutation({
    mutationFn: loginWithApple,
  });
