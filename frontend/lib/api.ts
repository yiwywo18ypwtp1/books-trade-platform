"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

if (!API_URL) {
    throw new Error("API URL is not defined in environment variables");
}

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");

            if (typeof window !== "undefined") {
                const currentPath = window.location.pathname;

                if (currentPath !== "/auth") {
                    window.location.href = "/auth";
                }
            }
        }

        return Promise.reject(err);
    }
);