import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
    password: z
        .string()
        .min(1, "Enter your password.")
        .max(72, "Use at most 72 characters.")
        .refine((value) => new TextEncoder().encode(value).length <= 72, "Password must fit within 72 bytes."),
});

export const signupSchema = loginSchema
    .extend({
        name: z.string().trim().min(2, "Use at least 2 characters.").max(60, "Use at most 60 characters."),
        password: z
            .string()
            .min(8, "Use at least 8 characters.")
            .max(72, "Use at most 72 characters.")
            .regex(/[a-zA-Z]/, "Include at least one letter.")
            .regex(/[0-9]/, "Include at least one number.")
            .refine((value) => new TextEncoder().encode(value).length <= 72, "Password must fit within 72 bytes."),
        confirmPassword: z.string(),
    })
    .refine((value) => value.password === value.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type AuthFormState = {
    message?: string;
    errors?: Partial<Record<"name" | "email" | "password" | "confirmPassword", string[]>>;
};
