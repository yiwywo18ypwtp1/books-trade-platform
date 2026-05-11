"use client";

import { useAuth } from "@clerk/nextjs";
import { createApi } from "@/lib/createApi";

export const useApi = () => {
    const { getToken } = useAuth();

    const getApi = async () => {
        const token = await getToken({
            template: "backend",
        });

        if (!token) {
            throw new Error("Unauthorized");
        }

        return createApi(token);
    };

    return { getApi };
};