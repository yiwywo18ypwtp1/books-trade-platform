import { cookies } from "next/headers";

import { Book } from "@/types/book";
import { getBookSSR } from "@/api/books";
import ExchangeButton from "@/components/ExchangeButton";

export default async function BookPage({ params }: { params: { id: string }; }) {
    const { id } = await params;

    const token = (await cookies()).get("token")?.value;

    const book: Book = await getBookSSR(Number(id), token);

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