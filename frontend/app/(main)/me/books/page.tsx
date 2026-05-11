"use client";

import { useEffect, useState } from "react";

import { deleteBook, getMyBooks, updateBook } from "@/api/books";
import { Book } from "@/types/book";
import BookList from "@/components/BooksList";
import EditBookModal from "@/components/EditBookModal";
import { useAlert } from "@/providers/AlertProvider";
import { useApi } from "@/hooks/useApi";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function MyBooks() {
    const { getApi } = useApi();
    const { currentUser, loading } = useCurrentUser();

    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const { addAlert } = useAlert();

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

    useEffect(() => {
        if (loading || !currentUser) return;

        fetchBooks();
    }, [loading, currentUser]);

    if (!books) return <div>Loading...</div>;
    if (!currentUser) return <div>Loading...</div>;

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