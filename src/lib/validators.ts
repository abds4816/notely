import { z } from "zod";

export const NoteValidator = z.object({
  title: z
    .string({ required_error: "Note title is required" })
    .min(3, "Note title must be at least 3 characters")
    .max(255, "Note title must be less than 255 characters"),
  description: z
    .string()
    .max(3000, "Note description must be less than 3000 characters")
    .optional(),
});

export type NoteRequest = z.infer<typeof NoteValidator>;
