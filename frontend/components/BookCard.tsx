import { Trash, Pencil } from "lucide-react";

import { Book } from "@/types/book";

type CardProps = {
    book: Book;
    isOwner?: boolean;
};

export default function BookCard({ book, isOwner }: CardProps) {
    return (
        <div className="border rounded-lg p-3 bg-white hover:shadow-md">
            <img
                src={book.photoUrl || "https://via.placeholder.com/150"}
                className="w-full h-40 object-cover rounded mb-2"
            />

            <h3 className="font-medium text-sm">{book.name}</h3>
            <p className="text-gray-500 text-sm">{book.author}</p>

            {isOwner && (
                <div className="flex gap-2 mt-2">
                    <button className="text-violet-400 bg-violet-100 border border-violet-400 w-1/2 py-1 rounded flex items-center justify-center
                        hover:bg-violet-200 transition cursor-pointer
                    "><Pencil className="text-violet-400" /></button>
                    <button className="text-red-400 bg-red-100 border border-red-400 w-1/2 py-1 rounded flex items-center justify-center
                        hover:bg-red-200 transition cursor-pointer
                    "><Trash className="text-red-400" /></button>
                </div>
            )}
        </div>
    );
}