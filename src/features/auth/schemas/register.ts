import { z } from "zod";

export const registerSchema = z.object({
  displayName: z.string().min(2, "Invalid username"),
  phoneNumber: z.string().min(2, "Invalid phone number format"),
  user: z.string().email(),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(16, "Password can only have 16 characters max"),
});

export type RegisterDto = z.infer<typeof registerSchema>;
