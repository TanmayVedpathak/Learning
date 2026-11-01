import { NextResponse } from "next/server";

import { type SuccessResponse,successResponseSchema } from "@/schemas/auth";

export async function GET(): Promise<NextResponse<SuccessResponse>> {
    const response = NextResponse.json(successResponseSchema.parse({
        message: "Logout successful",
        success: true,
    }));
    response.cookies.set("token", "", { httpOnly: true, path: "/", expires: new Date(0) });
    return response;
}
