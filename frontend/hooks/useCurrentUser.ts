"use client";

import { useEffect, useState } from "react";

import { User } from "@/types/user";
import { getMe } from "@/api/auth";
import { useApi } from "./useApi";

export const useCurrentUser = () => {
    const { getApi } = useApi();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getMe(await getApi());

                setCurrentUser(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { currentUser, loading };
};