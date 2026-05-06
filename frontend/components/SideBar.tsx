"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Library, PlusCircle, BookUser } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV = [
    {
        label: "All Books",
        href: "/books",
        icon: Library,
    },
    {
        label: "My Books",
        href: "/me/books",
        icon: BookUser,
    },
    {
        label: "Add Book",
        href: "/books/new",
        icon: PlusCircle,
    },
];

const SideBar = () => {
    const pathname = usePathname();

    const { user, logout } = useAuth();

    return (
        <div className="w-64 h-screen border-r border-gray-400 p-4 flex flex-col justify-between">
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 text-xl font-semibold mb-6">
                    <BookOpen />
                    <span>Book Trade</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {NAV.map((item) => {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 p-2 rounded-lg transition duration-300 ${pathname === item.href
                                    ? "bg-violet-100 text-violet-500"
                                    : "hover:bg-gray-200"
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {user && <div className="flex flex-col items-center justify-centerw-full">
                <span>{user.email}</span>
                <button onClick={logout} className="text-sm text-gray-500 underline hover:text-violet-400 cursor-pointer transition">Logout</button>
            </div>}
        </div>
    );
}

export default SideBar;