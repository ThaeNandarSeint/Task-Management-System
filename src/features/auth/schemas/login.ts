import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginDto = z.infer<typeof loginSchema>;
