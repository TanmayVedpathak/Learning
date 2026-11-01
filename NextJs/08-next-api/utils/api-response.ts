import { NextResponse } from "next/server";

import { z } from "zod";

import { type ApiError,apiErrorSchema } from "@/schemas/auth";

export function errorResponse(error: string, status: number): NextResponse<ApiError> {
    return NextResponse.json(apiErrorSchema.parse({ success: false, error }), { status });
}

export function handleApiError(error: unknown): NextResponse<ApiError> {
    if (error instanceof SyntaxError) {
        return errorResponse("Invalid JSON request body", 400);
    }
    if (error instanceof z.ZodError) {
        return errorResponse(error.issues[0]?.message ?? "Invalid request", 400);
    }
    console.error("API request failed:", error);
    return errorResponse("Something went wrong. Please try again.", 500);
}
