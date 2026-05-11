"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getBook, getRelated } from "@/api/books";
import { Book } from "@/types/book";
import BooksRow from "@/components/BooksRow";
import RequestModal from "@/components/RequestModal";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function BookPage() {
    const { id } = useParams();

    const { currentUser } = useCurrentUser();

    const [book, setBook] = useState<Book | null>(null);
    const [related, setRelated] = useState<Book[]>([]);

    const [selected, setSelected] = useState<number | null>(null);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const fetchBooks = async () => {
        try {
            if (!id) return;

            const book = await getBook(Number(id));
            const related = await getRelated(Number(id));

            setBook(book);
            setRelated(related);


        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [id])

    if (!book) return <div>Loading...</div>;

    const filteredRelated = related.filter(el => el.id !== book.id);

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

                            {currentUser?.id !== book.ownerId && <button
                                onClick={() => setIsOpened(true)}
                                className="bg-violet-500 py-2 text-white rounded-md hover:bg-violet-600 cursor-pointer transition"
                            >
                                Offer exchange
                            </button>}
                        </div>

                        <div className="flex flex-col text-xl">
                            <div><b>Name: </b><span>{book.name}</span></div>
                            <div><b>Author: </b><span>{book.author}</span></div>
                        </div>
                    </div>

                    <BooksRow title="More books from this author:" books={filteredRelated} cardType="link" />
                </div>
            </div>

            {isOpened &&
                <RequestModal
                    targetId={Number(id)}
                    selected={selected}
                    setSelected={setSelected}
                    onClose={() => {
                        setIsOpened(false);
                        setSelected(null)
                    }}
                />
            }
        </div>
    );
}