import axios from "axios";
import { z } from "zod";

import { apiErrorSchema } from "@/schemas/auth";

export function getApiErrorMessage(error: unknown): string {
    if (axios.isAxiosError<unknown>(error)) {
        const result = apiErrorSchema.safeParse(error.response?.data);
        return result.success ? result.data.error : "Request failed. Please try again.";
    }
    if (error instanceof z.ZodError) return error.issues[0]?.message ?? "Invalid response";
    return error instanceof Error ? error.message : "Something went wrong";
}
