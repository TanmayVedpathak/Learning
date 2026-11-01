import { MongoClient, ObjectId } from "mongodb";

import "server-only";

export type PasswordUser = {
    _id: ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
};

const globalForMongo = globalThis as typeof globalThis & {
    authDb?: Promise<ReturnType<MongoClient["db"]>>;
};

export function getDb() {
    if (!globalForMongo.authDb) {
        const uri = process.env.MONGO_URL;

        if (!uri) throw new Error("MONGO_URL is missing.");

        const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

        globalForMongo.authDb = client
            .connect()
            .then(async () => {
                const db = client.db(process.env.MONGO_DB_NAME || "next_auth");
                await db.collection("users").createIndex({ email: 1 }, { unique: true });
                await db.collection("authAttempts").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
                return db;
            })
            .catch(async (error: unknown) => {
                globalForMongo.authDb = undefined;
                await client.close().catch(() => undefined);
                throw error;
            });
    }
    return globalForMongo.authDb;
}

export async function getUsers() {
    return (await getDb()).collection<PasswordUser>("users");
}
