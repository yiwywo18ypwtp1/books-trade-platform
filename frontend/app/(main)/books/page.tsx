"use client";

import { useEffect, useState } from "react";

import { getBooks } from "@/api/books";
import { Book } from "@/types/book";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/hooks/useAuth";
import BookCard from "@/components/BookCard";

export default function BooksPage() {
    const { user, loading, logout } = useAuth()

    const [books, setBooks] = useState<Book[]>([]);

    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    const debouncedSearch = useDebounce(search, 400);

    const limit = 8;

    useEffect(() => {
        if (!user && !loading) {
            logout();
            return;
        }

        const fetchBooks = async () => {
            const res = await getBooks(page, limit, debouncedSearch);

            setBooks(res.data);
            setTotal(res.meta.total);
        };

        fetchBooks();
    }, [page, limit, debouncedSearch]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-5 mx-auto h-full flex flex-col justify-between">
            <div className="w-full">
                <h1 className="text-2xl font-semibold mb-5">📚 Books</h1>

                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    placeholder="Search by name or author..."
                    className="border border-gray-300 px-3 py-2 rounded-full mb-4 w-full transition outline-0 focus:border-violet-400"
                />

                <div className="grid grid-cols-4 gap-4">
                    {books.map((b) => (
                        <BookCard key={b.id} book={b} isOwner={b.ownerId === user?.id} />
                    ))}
                </div>
            </div>

            <div className="mt-5 flex gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 border rounded ${p === page
                            ? "bg-black text-white"
                            : "bg-white text-black"
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
}