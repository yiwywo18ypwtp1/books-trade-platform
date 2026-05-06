"use client";

import { useEffect, useState } from "react";

import { getMyBooks } from "@/api/books";
import { Book } from "@/types/book";
import { useAuth } from "@/hooks/useAuth";
import BookCard from "@/components/BookCard";

export default function MyBooks() {
    const { user, loading, logout } = useAuth();

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        if (!user && !loading) {
            logout();
            return;
        }

        const fetchBooks = async () => {
            const res = await getMyBooks();

            setBooks(res);
        };

        fetchBooks();
    }, []);

    return (
        <div className="p-5 w-full mx-auto h-full flex flex-col">
            <h1 className="text-2xl font-semibold mb-5">📚 My books</h1>

            <div className="grid grid-cols-5 grid-rows-2 gap-4 flex-1">
                {books.map((b) => (
                    <BookCard key={b.id} book={b} isOwner={b.ownerId === user?.id} />
                ))}
            </div>
        </div>
    );
}