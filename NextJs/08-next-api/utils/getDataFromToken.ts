import type { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

import { tokenDataSchema } from "@/schemas/auth";

export const getDataFromToken = (request: NextRequest): string => {
    const token = request.cookies.get("token")?.value;
    const secret = process.env.TOKEN_SECRET;
    if (!token || !secret) throw new Error("Invalid session");
    return tokenDataSchema.parse(jwt.verify(token, secret)).id;
};
