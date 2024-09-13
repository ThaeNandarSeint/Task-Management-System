import { Button, Checkbox, Link, PasswordInput, TextInput } from "@/components";
import {
  AuthHeader,
  AuthNavigator,
  LoginDto,
  loginSchema,
  useAuth,
  useLogin,
} from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/libs/mantine-toast";
import { Link as RouterLink } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      rememberMe: false,
    },
  });

  const { mutate, isPending: isLoading } = useLogin();
  const { onLogin } = useAuth();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (data) => {
        onLogin(data);
        toast.success({
          message: "Login successful!",
        });
        navigate("/");
      },
    });
  });

  return (
    <form
      className="bg-white w-[500px] px-6 py-7 rounded-lg m-auto flex flex-col gap-4 mt-14"
      onSubmit={onSubmit}
    >
      <AuthHeader
        title="Sign In"
        description="Welcome back! Please enter your details"
      />
      <div className="flex flex-col gap-5">
        <TextInput
          label="Email"
          type="email"
          {...register("user")}
          error={errors.user?.message}
        />
        <PasswordInput
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <div className="flex justify-between items-center">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label="Remember Me"
                checked={!!value}
                onChange={onChange}
              />
            )}
          />
          <Link
            to="/auth/forgot-password"
            component={RouterLink}
            className="text-secondary-500"
          >
            Forgot Password ?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          variant={isLoading ? "outline" : "filled"}
        >
          Login
        </Button>
      </div>
      <AuthNavigator
        description="Do not have an account?"
        href="/auth/register"
        title="Register"
      />
    </form>
  );
};
