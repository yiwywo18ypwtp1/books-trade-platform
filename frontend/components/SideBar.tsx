"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Library, PlusCircle, BookUser, ArrowDownUp } from "lucide-react";
import { useUser, SignOutButton, Show, UserButton } from "@clerk/nextjs";

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
        label: "Trade offers",
        href: "/trade-offers",
        icon: ArrowDownUp,
    },
    {
        label: "Add Book",
        href: "/books/new",
        icon: PlusCircle,
    },
];

const SideBar = () => {
    const pathname = usePathname();

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

            <div className="flex flex-col items-center justify-center">
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>
        </div>
    );
}

export default SideBar;