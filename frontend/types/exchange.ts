import { Book } from "./book";

export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface ExchangeRequest {
    id: number;
    senderId: number;
    receiverId: number;
    bookId: number;
    offeredBookId: number;
    message?: string;
    status: RequestStatus;
    createdAt: string;

    sender?: {
        id: number;
        name: string;
        email: string;
    };

    receiver?: {
        id: number;
        name: string;
        email: string;
    };

    book?: Book;
    offeredBook?: Book;
}
