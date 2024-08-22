import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "asdasEmail or password is invalid."
  }),
  password: z.string().min(8, {
    message: "asddasEmail or password is invalid."
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Minimum 2 characters are required",
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters are required"
  }),
});
