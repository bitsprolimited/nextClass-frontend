import { z } from "zod";

// Zod schema for form validation
export const learnerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  birthMonth: z.string().min(1, "Birth month is required"),
  birthYear: z.string().min(1, "Birth year is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  grade: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export type LearnerFormData = z.infer<typeof learnerFormSchema>;
