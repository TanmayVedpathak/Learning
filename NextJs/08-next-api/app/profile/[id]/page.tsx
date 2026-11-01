"use client";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-hot-toast";

import { getApiErrorMessage } from "@/utils/api-error";

import { successResponseSchema, userResponseSchema } from "@/schemas/auth";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState<string | null>(null)
    const logout = async () => {
        try {
            const { data } = await axios.get<unknown>('/api/users/logout');
            successResponseSchema.parse(data);
            toast.success('Logout successful')
            router.push('/sign-in')
        } catch (error: unknown) {
            toast.error(getApiErrorMessage(error));
        }
    }

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get<unknown>('/api/users/profile');
            const response = userResponseSchema.parse(data);
            setData(response.data._id);
        } catch (error: unknown) {
            toast.error(getApiErrorMessage(error));
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === null ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>


        </div>
    )
}