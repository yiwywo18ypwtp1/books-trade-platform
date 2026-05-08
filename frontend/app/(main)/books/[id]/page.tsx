"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getBook, getRelated } from "@/api/books";
import { Book } from "@/types/book";
import ExchangeButton from "@/components/ExchangeButton";
import BookCard from "@/components/BookCard";
import { createApi } from "@/lib/createApi";
import { getToken } from "@clerk/nextjs";

export default function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    const [related, setRelated] = useState<Book[]>([]);

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
        try {
            if (!id) return;

            const book = await getBook(await getApi(), Number(id));
            const related = await getRelated(await getApi(), Number(id));

            setBook(book);
            setRelated(related);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    const filteredRelated = related.filter(el => el.id !== book.id)

    return (
        <div className="w-full h-full flex-1 flex items-center justify-center flex-col gap-8">
            <div className="p-10 w-355 min-w-0 h-full flex flex-row gap-4">
                <div className="bg-white rounded-2xl border border-gray-300 shadow-lg p-10 w-full min-w-0 flex flex-col justify-between">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3">
                            <div className="w-60 h-80 overflow-hidden rounded-lg border border-gray-300 shadow-lg hover:scale-103 hover:shadow-none transition">
                                <img
                                    src={book.photoUrl || ""}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <ExchangeButton bookId={book.id} />
                        </div>

                        <div className="flex flex-col text-xl">
                            <div><b>Name: </b><span>{book.name}</span></div>
                            <div><b>Author: </b><span>{book.author}</span></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 min-h-80 overflow-hidden">
                        <h1 className="text-xl font-semibold">More books from this author:</h1>

                        <div className="p-4 h-full bg-gray-100 border border-gray-200 rounded-xl overflow-hidden">
                            {filteredRelated.length > 0 ? (
                                <div className="flex gap-4 min-h-fit h-full overflow-x-auto w-full overflow-y-visible">
                                    {filteredRelated.map(b => (
                                        <BookCard
                                            key={b.id}
                                            book={b}
                                            variant="row"
                                        />
                                    ))}
                                </div>
                            ) : <span className="flex items-center justify-center h-full text-gray-500">This author has no other books</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}