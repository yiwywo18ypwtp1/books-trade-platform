"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getBook } from "@/api/books";
import { Book } from "@/types/book";
import ExchangeButton from "@/components/ExchangeButton";

export default function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (!id) return;

        getBook(Number(id)).then(setBook);
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="w-full h-full flex-1 flex items-center justify-center flex-col gap-8">
            <div className="p-10 w-full h-full flex flex-row gap-4">
                <div className="bg-white rounded-2xl border border-gray-300 shadow-lg p-10 w-full flex flex-col justify-between">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3">
                            <div className="w-60 h-80 overflow-hidden rounded-lg">
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

                    <div className="flex flex-col h-60">
                        <h1 className="text-xl font-semibold">More books from this author:</h1>

                        <div className="flex flex-row items-center justify-center bg-gray-100 border-gray-300 rounded-xl border h-full text-black/50">
                            In development...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}