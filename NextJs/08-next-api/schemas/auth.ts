import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email("Please provide a valid email")),
    password: z.string().min(1, "Please provide a password"),
});

export const signUpSchema = signInSchema.extend({
    username: z.string().trim().min(1, "Please provide a username"),
    password: z.string().min(8, "Password must contain at least 8 characters")
        .refine((password) => new TextEncoder().encode(password).length <= 72,
            "Password must not exceed 72 bytes"),
});

export const verifyEmailSchema = z.object({
    token: z.string().trim().min(1, "Verification token is required"),
});

export const tokenDataSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i),
    username: z.string(),
    email: z.email(),
});

export const publicUserSchema = z.object({
    _id: z.string(),
    username: z.string(),
    email: z.email(),
    isVerified: z.boolean(),
    isAdmin: z.boolean(),
});

export const apiErrorSchema = z.object({
    success: z.literal(false),
    error: z.string(),
});

export const successResponseSchema = z.object({
    success: z.literal(true),
    message: z.string(),
});

export const userResponseSchema = successResponseSchema.extend({
    data: publicUserSchema,
});

export const apiResponseSchema = z.discriminatedUnion("success", [
    successResponseSchema,
    apiErrorSchema,
]);

export const userApiResponseSchema = z.discriminatedUnion("success", [
    userResponseSchema,
    apiErrorSchema,
]);

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type TokenData = z.infer<typeof tokenDataSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type UserApiResponse = z.infer<typeof userApiResponseSchema>;
