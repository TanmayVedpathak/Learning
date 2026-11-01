import mongoose, { type Model } from "mongoose";

export type UserType = {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
};

const userSchema = new mongoose.Schema<UserType>({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User: Model<UserType> = mongoose.models.Users || mongoose.model<UserType>("Users", userSchema);

export default User;
