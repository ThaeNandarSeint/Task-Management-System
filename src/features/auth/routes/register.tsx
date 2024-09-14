import { Button, PasswordInput, TextInput } from "@/components";
import {
  AuthHeader,
  AuthNavigator,
  RegisterDto,
  registerSchema,
  useAuth,
  useRegister,
} from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/libs/mantine-toast";

export const Register = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const { mutate, isPending: isLoading } = useRegister();
  const { onLogin } = useAuth();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: ({ payload }) => {
        onLogin(payload);
        toast.success({
          message: "Register successful!",
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
        title="Sign Up"
        description="Register to create your first account"
      />
      <div className="flex flex-col gap-5">
        <TextInput
          label="Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <TextInput
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant={isLoading ? "outline" : "filled"}
        >
          Register
        </Button>
      </div>
      <AuthNavigator
        description="Already have an account?"
        href="/auth/login"
        title="Login"
      />
    </form>
  );
};
