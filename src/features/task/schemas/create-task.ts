import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
});

export type TaskDto = z.infer<typeof taskSchema>;
