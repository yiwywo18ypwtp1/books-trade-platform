"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { User, UserLogin, UserSignup } from "@/types/user";
import * as authApi from "@/api/auth";

type ContextType = {
    user: User | null;
    loading: boolean;
    login: (payload: UserLogin) => Promise<void>;
    signup: (data: UserSignup) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const me = await authApi.getMe();

                setUser(me);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const login = async (payload: {
        email: string;
        password: string;
    }) => {
        const data = await authApi.login(payload);
        setUser(data.user);
    };

    const signup = async (payload: {
        name: string;
        email: string;
        password: string;
    }) => {
        await authApi.signup(payload);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/auth");
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, signup, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };