"use client";

import { useEffect, useState } from "react";

import { deleteBook, getMyBooks, updateBook } from "@/api/books";
import { Book } from "@/types/book";
import { useAuth } from "@/hooks/useAuth";
import BookList from "@/components/BooksList";
import EditBookModal from "@/components/EditBookModal";

export default function MyBooks() {
    const { user, loading } = useAuth();

    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const fetchBooks = async () => {
        const res = await getMyBooks();

        setBooks(res);
    };

    useEffect(() => {
        if (!user) return;
        fetchBooks();
    }, [loading, user]);

    const handleDelete = async (id: number) => {
        setBooks((prev) => prev.filter((b) => b.id !== id));

        try {
            await deleteBook(id);
        } catch (err) {
            console.error(err);

            await fetchBooks();
        }
    };

    return (
        <div className="p-5 w-full mx-auto h-full flex flex-col">
            <h1 className="text-2xl font-semibold mb-5">📚 My books</h1>

            <BookList
                books={books}
                userId={user?.id}
                onEdit={(b) => setEditingBook(b)}
                onDelete={handleDelete}
            />

            {editingBook && (
                <EditBookModal
                    book={editingBook}
                    onClose={() => setEditingBook(null)}
                    onSave={async (data) => {
                        await updateBook(editingBook.id, data);
                        await fetchBooks();
                    }}
                />
            )}
        </div>
    );
}