"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createBook } from "@/api/books"
import { getToken, useUser } from "@clerk/nextjs";
import { createApi } from "@/lib/createApi";
import { User } from "@/types/user";
import { getMe } from "@/api/auth";

const AddBook = () => {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [name, setName] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [photoUrl, setPhotoUrl] = useState<string>("");

    const [error, setError] = useState<string>("");

    const getApi = async () => {
        const token = await getToken({
            template: "backend",
        });

        if (!token) {
            throw new Error("Unauthorized");
        }

        return createApi(token);
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await getMe(await getApi());

            setCurrentUser(res);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async () => {
        if (!isLoaded) return;

        if (!user) {
            router.push("/auth");
            return;
        }

        try {
            await createBook(await getApi(), { name: name, author: author || currentUser?.name || "Unknown", photoUrl: photoUrl });

            router.push("/me/books");
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [isLoaded, user])

    return (
        <div className="w-full h-full flex-1 flex items-center justify-center flex-col gap-8">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl flex flex-col gap-4">

                <h2 className="text-2xl text-zinc-900 font-semibold text-center">
                    Add new book
                </h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                />

                <input
                    type="text"
                    placeholder="Author name (leave blank for use your Accaunt name)"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                />

                <input
                    type="text"
                    placeholder="Photo URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                />

                <button
                    onClick={handleAdd}
                    className="bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 cursor-pointer transition"
                >
                    Add
                </button>

                {error ?? <span className="text-red-400 text-sm animate-pulse">{error}</span>}
            </div>
        </div>
    );
}

export default AddBook;