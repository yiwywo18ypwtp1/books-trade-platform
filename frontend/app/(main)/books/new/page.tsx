"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createBook } from "@/api/books"

const AddBook = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    const [name, setName] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [photoUrl, setPhotoUrl] = useState<string>("");

    const [error, setError] = useState<string>("");

    const handleAdd = async () => {
        if (loading) return;

        if (!user) {
            router.push("/auth");
            return;
        }

        try {
            await createBook({ name: name, author: author || user.name, photoUrl: photoUrl });

            router.push("/me/books");
        } catch (err: any) {
            setError(err.message);
        }
    };

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