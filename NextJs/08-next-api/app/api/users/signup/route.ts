import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

import User from "@/app/models/userModel";

import { errorResponse, handleApiError } from "@/utils/api-response";
import { sendEmail } from "@/utils/mailer";
import { toPublicUser } from "@/utils/public-user";

import { connectDB } from "@/dbConfig/dbConfig";
import { signUpSchema, type UserApiResponse,userResponseSchema } from "@/schemas/auth";

export async function POST(request: NextRequest): Promise<NextResponse<UserApiResponse>> {
    try {
        const body: unknown = await request.json();
        const { username, email, password } = signUpSchema.parse(body);
        await connectDB();
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return errorResponse("Email or username is already registered", 409);
        const savedUser = await User.create({
            username,
            email,
            password: await bcryptjs.hash(password, 10),
        });
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id.toString() });
        return NextResponse.json(userResponseSchema.parse({
            message: "Account created. Check your email to verify your account before signing in.",
            success: true,
            data: toPublicUser(savedUser),
        }), { status: 201 });
    } catch (error: unknown) {
        if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
            return errorResponse("Email or username is already registered", 409);
        }
        return handleApiError(error);
    }
}
