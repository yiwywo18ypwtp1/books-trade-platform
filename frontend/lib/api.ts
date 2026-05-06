"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

if (!API_URL) {
    throw new Error("API URL is not defined in environment variables");
}

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            const url = err.config?.url;

            if (!url?.includes("/auth/me")) {
                if (typeof window !== "undefined") {
                    window.location.href = "/auth";
                }
            }
        }

        return Promise.reject(err);
    }
);