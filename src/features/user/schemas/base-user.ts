import { z } from "zod";

export const baseUserSchema = z.object({
  name: z.string().min(2, "Invalid username"),
});

export type UserDto = z.infer<typeof baseUserSchema>;
