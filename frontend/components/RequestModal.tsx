"use client"

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs"
import { getMyBooks, sendExchangeRequest } from "@/api/books";
import { createApi } from "@/lib/createApi";
import { Book } from "@/types/book";
import BooksRow from "./BooksRow";
import { useAlert } from "@/providers/AlertProvider";
import { ArrowDownUp } from "lucide-react";

type Props = {
    targetId: number;
    selected?: number | null;
    setSelected: (id: number) => void;
    onClose: () => void;
}

const RequestModal = ({ targetId, selected, setSelected, onClose }: Props) => {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const { addAlert } = useAlert();

    const [books, setBooks] = useState<Book[]>([]);
    const [message, setMessage] = useState<string>("");

    const getApi = async () => {
        const token = await getToken({
            template: "backend",
        });

        if (!token) {
            throw new Error("Unauthorized");
        }

        return createApi(token);
    };

    const handleSend = async () => {
        if (!selected) {
            addAlert("Select your book for exchange", "error");

            return;
        }

        await sendExchangeRequest(await getApi(), targetId, selected, message);
        addAlert("Email sent successfully", "success");
        onClose();
    }

    const fetchBooks = async () => {
        const res = await getMyBooks(await getApi());

        setBooks(res);
    };

    useEffect(() => {
        if (!isLoaded || !user) return;

        fetchBooks();
    }, [isLoaded, user]);

    return (
        <div className="fixed inset-0 bg-black/50 border flex flex-col items-center jsutify-center gap-1 overflow-hidden z-50">
            <div className="max-w-500 w-300 min-h-100 h-fit">
                <div className="flex flex-col gap-3 p-4 h-full border bg-white border-gray-300 rounded-xl overflow-hidden">
                    {books.length > 0 ? (
                        <BooksRow title="Select your book to exchange" books={books} setSelected={setSelected} selected={selected} cardType="button" />
                    ) : <span className="flex items-center justify-center h-full text-gray-500">You dont have books for offer</span>}

                    <input
                        type="text"
                        placeholder="Message (optional)"
                        className="border border-gray-300 p-2 rounded-xl focus:border-violet-500 focus:outline-none transition"
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        disabled={!selected}
                        onClick={handleSend}
                        className={`flex gap-2 justify-center items-center bg-violet-500 py-2 px-4 text-white rounded-xl h-10 hover:bg-violet-600
                            cursor-pointer transition
                            ${books.length <= 0 || !selected && "pointer-events-none cursor-not-allowed opacity-70"}
                        `}
                    >
                        Confirm
                        <ArrowDownUp size={20} />
                    </button>

                    <button
                        onClick={onClose}
                        className="underline border border-violet-500 text-violet-500 cursor-pointer w-full flex justify-center bg-white hover:text-white hover:bg-violet-500 rounded-xl py-2 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RequestModal;