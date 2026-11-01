import type { HydratedDocument } from "mongoose";

import type { UserType } from "@/app/models/userModel";

import { type PublicUser,publicUserSchema } from "@/schemas/auth";

export function toPublicUser(user: HydratedDocument<UserType>): PublicUser {
    return publicUserSchema.parse({
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
    });
}
