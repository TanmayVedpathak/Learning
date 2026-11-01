import { NextRequest, NextResponse } from "next/server";

import User from "@/app/models/userModel";

import { errorResponse, handleApiError } from "@/utils/api-response";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { toPublicUser } from "@/utils/public-user";

import { connectDB } from "@/dbConfig/dbConfig";
import { type UserApiResponse,userResponseSchema } from "@/schemas/auth";

export async function GET(request: NextRequest): Promise<NextResponse<UserApiResponse>> {
    let userId: string;
    try {
        userId = getDataFromToken(request);
    } catch {
        return errorResponse("Please sign in again", 401);
    }
    try {
        await connectDB();
        const user = await User.findById(userId);
        if (!user) return errorResponse("User not found", 404);
        return NextResponse.json(userResponseSchema.parse({
            message: "User found",
            success: true,
            data: toPublicUser(user),
        }));
    } catch (error: unknown) {
        return handleApiError(error);
    }
}
