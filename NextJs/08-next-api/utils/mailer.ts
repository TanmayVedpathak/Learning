import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

import User from "@/app/models/userModel";

import type { EmailType } from "@/types";

interface SendEmailOptions {
    email: string;
    emailType: EmailType;
    userId: string;
}

export async function sendEmail({ email, emailType, userId }: SendEmailOptions): Promise<SMTPTransport.SentMessageInfo> {
    const domain = process.env.DOMAIN;
    const port = Number(process.env.SMTP_PORT ?? 587);
    if (!domain) throw new Error("DOMAIN is not configured");
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("SMTP_PORT must be a valid port number");
    }
    const hashedToken = await bcryptjs.hash(userId, 10);
    const expiresAt = new Date(Date.now() + 3600000);
    const verificationUrl = new URL(
        emailType === "VERIFY" ? "/verifyemail" : "/resetpassword", domain,
    );
    verificationUrl.searchParams.set("token", hashedToken);
    const user = await User.findByIdAndUpdate(userId, emailType === "VERIFY"
        ? { verifyToken: hashedToken, verifyTokenExpiry: expiresAt }
        : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: expiresAt });
    if (!user) throw new Error("User not found");
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    // Omitting the callback makes sendMail return a promise and propagate SMTP errors.
    return transporter.sendMail({
        from: process.env.SMTP_FROM ?? "Private Person <from@example.com>",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        text: `Open this link to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}: ${verificationUrl.toString()}`,
    });
}
