"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import SideBar from "@/components/SideBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth");
        }
    }, [loading, user, router]);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <div className="flex">
            <SideBar />

            <main className="flex-1 bg-gray-50 min-h-screen">
                {children}
            </main>
        </div>
    );
}
