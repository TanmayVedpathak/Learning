import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@/app/models/userModel";

import { errorResponse, handleApiError } from "@/utils/api-response";

import { connectDB } from "@/dbConfig/dbConfig";
import { type ApiResponse, signInSchema, successResponseSchema, type TokenData } from "@/schemas/auth";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const body: unknown = await request.json();
        const { email, password } = signInSchema.parse(body);
        await connectDB();
        const user = await User.findOne({ email });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return errorResponse("Invalid email or password", 400);
        }
        if (!user.isVerified) {
            return errorResponse("Please verify your email before signing in", 403);
        }
        const tokenData: TokenData = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
        };
        const secret = process.env.TOKEN_SECRET;
        if (!secret) throw new Error("TOKEN_SECRET is not configured");
        const token = jwt.sign(tokenData, secret, { expiresIn: "1d" });
        const response = NextResponse.json(successResponseSchema.parse({
            message: "Login successful",
            success: true,
        }));
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 86400,
        });
        return response;
    } catch (error: unknown) {
        return handleApiError(error);
    }
}
