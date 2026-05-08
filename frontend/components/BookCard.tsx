"use client"

import { Trash, Pencil } from "lucide-react";

import { Book } from "@/types/book";
import Link from "next/link";

type CardProps = {
    book: Book;
    isOwner?: boolean;
    onEdit?: (book: Book) => void;
    onDelete?: (id: number) => void;
    variant?: "grid" | "row";
};

export default function BookCard({ book, isOwner, onEdit, onDelete, variant }: CardProps) {
    const base = "flex flex-col justify-between border border-gray-300 rounded-lg p-3 bg-white shadow-lg transition hover:shadow-none hover:border-gray-400";

    const sizes =
        variant === "row"
            ? "min-w-[160px] max-w-[180px] flex-shrink-0 hover:scale-97"
            : "w-full hover:translate-y-1";

    return (
        <Link
            href={`/books/${book.id}`}
            className={`${base} ${sizes}`}
        >
            <div className="w-full aspect-[3/4] mb-2">
                <img
                    src={book.photoUrl || "https://via.placeholder.com/150"}
                    className="w-full h-full object-cover rounded border border-gray-200"
                />
            </div>

            <div>
                <h3 className="font-medium text-sm">{book.name}</h3>
                <p className="text-gray-500 text-sm">{book.author}</p>

                {isOwner && (
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onEdit?.(book);
                            }}
                            className="
                                text-violet-400 bg-violet-100 border border-violet-400 w-1/2 py-1 rounded flex items-center justify-center
                                hover:bg-violet-200 transition cursor-pointer
                        ">
                            <Pencil className="text-violet-400" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete?.(book.id)
                            }}
                            className="
                                text-red-400 bg-red-100 border border-red-400 w-1/2 py-1 rounded flex items-center justify-center
                                hover:bg-red-200 transition cursor-pointer
                        ">
                            <Trash className="text-red-400" />
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}