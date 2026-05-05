export type ExchangeRequest = {
    id: number;
    senderId: number;
    receiverId: number;
    bookId: number;
    message: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string;
};