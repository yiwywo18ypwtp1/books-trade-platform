"use client";

import { useEffect, useState } from "react";

import { deleteBook, getMyBooks, updateBook } from "@/api/books";
import { Book } from "@/types/book";
import BookList from "@/components/BooksList";
import EditBookModal from "@/components/EditBookModal";
import { useAuth, useUser } from "@clerk/nextjs";
import { createApi } from "@/lib/createApi";
import { User } from "@/types/user";
import { getMe } from "@/api/auth";
import { useAlert } from "@/providers/AlertProvider";

export default function MyBooks() {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const { addAlert } = useAlert();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

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
        const res = await getMyBooks(await getApi());

        setBooks(res);
    };

    const handleDelete = async (id: number) => {
        setBooks((prev) => prev.filter((b) => b.id !== id));

        try {
            await deleteBook(await getApi(), id);

            addAlert("Book deleted successfully", "success");
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await getMe(await getApi());

            setCurrentUser(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!isLoaded || !user) return;

        fetchCurrentUser();
        fetchBooks();
    }, [isLoaded, user]);

    if (!books) return <div>Loading...</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-5 w-full mx-auto h-full flex flex-col">
            <h1 className="text-2xl font-semibold mb-5">📚 My books</h1>

            <BookList
                books={books}
                userId={(currentUser?.id)}
                onEdit={(b) => setEditingBook(b)}
                onDelete={handleDelete}
            />

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