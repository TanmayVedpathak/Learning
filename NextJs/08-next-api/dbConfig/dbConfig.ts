import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | undefined;

export async function connectDB(): Promise<typeof mongoose> {
    if (mongoose.connection.readyState === 1) return mongoose;
    const uri = process.env.MONGO_URL;
    if (!uri) throw new Error("MONGO_URL is not configured");
    connectionPromise ??= mongoose.connect(uri).catch((error: unknown) => {
        connectionPromise = undefined;
        throw error;
    });
    return connectionPromise;
}
