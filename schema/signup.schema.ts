import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm password must match"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error shows under confirmPassword field
  });

export type SignupInput = z.infer<typeof SignupSchema>;
