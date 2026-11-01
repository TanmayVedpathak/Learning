import { NextRequest, NextResponse } from "next/server";

import User from "@/app/models/userModel";

import { errorResponse, handleApiError } from "@/utils/api-response";

import { connectDB } from "@/dbConfig/dbConfig";
import { type ApiResponse,successResponseSchema, verifyEmailSchema } from "@/schemas/auth";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const body: unknown = await request.json();
        const { token } = verifyEmailSchema.parse(body);
        await connectDB();

        const user = await User.findOneAndUpdate(
            { verifyToken: token, verifyTokenExpiry: { $gt: new Date() } },
            { $set: { isVerified: true }, $unset: { verifyToken: "", verifyTokenExpiry: "" } },
            { new: true },
        );

        if (!user) {
            return errorResponse("Verification link is invalid or has expired", 400);
        }

        return NextResponse.json(successResponseSchema.parse({
            message: "Email verified successfully",
            success: true,
        }));
    } catch (error: unknown) {
        return handleApiError(error);
    }
}
