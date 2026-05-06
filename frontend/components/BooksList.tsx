"use client"

import { Book } from "@/types/book";
import BookCard from "./BookCard";

type Props = {
    books: Book[];
    onEdit?: (book: Book) => void;
    onDelete?: (id: number) => void;
    userId?: number;
};

export const BookList = ({ books, onEdit, onDelete, userId }: Props) => {
    return (
        <div className="grid grid-cols-6 grid-rows-2 gap-4 flex-1 overflow-hidden">
            {books.map((b) => (
                <BookCard
                    key={b.id}
                    book={b}
                    isOwner={b.ownerId === userId}
                    onEdit={() => onEdit?.(b)}
                    onDelete={() => onDelete?.(b.id)}
                />
            ))}
        </div>
    );
}

export default BookList;