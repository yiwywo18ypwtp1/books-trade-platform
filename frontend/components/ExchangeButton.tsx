"use client";

import { ArrowDownUp } from "lucide-react";
import { sendExchangeRequest } from "@/api/books";

export default function ExchangeButton({ bookId }: { bookId: number }) {
    return (
        <button
            onClick={() => sendExchangeRequest(bookId)}
            className="flex gap-2 justify-center items-center bg-violet-500 py-2 px-4 text-white font-semibold rounded-lg h-10 hover:bg-violet-600 cursor-pointer transition"
        >
            Request exchange
            <ArrowDownUp size={20} />
        </button>
    );
}