"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";

type Props = {
    book: Book;
    onClose: () => void;
    onSave: (data: {
        name: string;
        author: string;
        photoUrl: string;
    }) => Promise<void>;
};

const EditBookModal = ({ book, onClose, onSave }: Props) => {
    const [name, setName] = useState(book.name);
    const [author, setAuthor] = useState(book.author);
    const [photoUrl, setPhotoUrl] = useState(book.photoUrl ?? "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSave = async () => {
        if (!name.trim()) return;

        try {
            setLoading(true);
            await onSave({ name, author, photoUrl });
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold">Edit book</h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
                />

                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
                />

                <input
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Photo URL"
                    className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
                />

                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 bg-violet-500 text-white py-2 rounded hover:bg-violet-600 transition"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditBookModal;