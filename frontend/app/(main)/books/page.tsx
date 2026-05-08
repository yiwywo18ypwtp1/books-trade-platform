"use client";

import { useEffect, useState } from "react";

import { deleteBook, getBooks, updateBook } from "@/api/books";
import { Book } from "@/types/book";
import { useDebounce } from "@/hooks/useDebounce";
import BookList from "@/components/BooksList";
import EditBookModal from "@/components/EditBookModal";
import { useAuth, useUser } from "@clerk/nextjs";
import { User } from "@/types/user";
import { createApi } from "@/lib/createApi";
import { getMe } from "@/api/auth";

export default function BooksPage() {
    const { user, isLoaded } = useUser()
    const { getToken } = useAuth();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    const debouncedSearch = useDebounce(search, 400);

    const limit = 12;

    const getApi = async () => {
        const token = await getToken({
            template: "backend",
        });

        if (!token) {
            throw new Error("Unauthorized");
        }

        return createApi(token);
    };

    const fetchBooks = async () => {
        const res = await getBooks(page, limit, debouncedSearch);

        setBooks(res.data);
        setTotal(res.meta.total);
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await getMe(await getApi());

            setCurrentUser(res);
        } catch (err) {
            console.error(err);
        }
    };


    const totalPages = Math.ceil(total / limit);

    const handleDelete = async (id: number) => {
        setBooks((prev) => prev.filter((b) => b.id !== id));

        try {
            await deleteBook(await getApi(), id);
        } catch (err) {
            console.error(err);

            await fetchBooks();
        }
    };

    useEffect(() => {
        fetchCurrentUser();
        fetchBooks();
    }, [page, limit, debouncedSearch]);

    return (
        <div className="p-5 mx-auto min-h-screen flex flex-col">
            <div className="w-full flex-1 flex flex-col">
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

                <BookList
                    books={books}
                    userId={currentUser?.id}
                    onEdit={(b) => setEditingBook(b)}
                    onDelete={handleDelete}
                />
            </div>

            <div className="flex gap-2 flex-wrap">
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

            {editingBook && (
                <EditBookModal
                    book={editingBook}
                    onClose={() => setEditingBook(null)}
                    onSave={async (data) => {
                        await updateBook(await getApi(), editingBook.id, data);
                        await fetchBooks();
                    }}
                />
            )}
        </div>
    );
}