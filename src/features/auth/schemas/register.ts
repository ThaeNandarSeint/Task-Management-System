import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Invalid username"),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(16, "Password can only have 16 characters max"),
});

export type RegisterDto = z.infer<typeof registerSchema>;
