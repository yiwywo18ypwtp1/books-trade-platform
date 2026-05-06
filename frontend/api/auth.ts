import { api } from "@/lib/api";
import { User } from "@/types/user";

export const login = async (payload: { email: string, password: string }) => {
    const { data } = await api.post<{ user: User; token: string; }>("/auth/login", payload);

    if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
    }

    return data;
};

export const signup = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
};

export const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
};

export const getMe = async () => {
    const { data } = await api.get<{ user: User }>("/auth/me");
    return data.user;
};
