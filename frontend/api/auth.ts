import { AxiosInstance } from "axios";
import { User } from "@/types/user";


export const getMe = async (api: AxiosInstance) => {
    const { data } = await api.get<{ user: User }>("/auth/me");

    return data.user;
};
