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
        href: "/books/create",
        icon: PlusCircle,
    },
];

const SideBar = () => {
    const pathname = usePathname();

    const { user } = useAuth();

    return (
        <div className="w-64 h-screen border-r p-4 flex flex-col">
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
                                ? "bg-violet-400 text-white"
                                : "hover:bg-gray-200"
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* <div>
                {user && <span>{user.name}</span>}
            </div> */}
        </div>
    );
}

export default SideBar;