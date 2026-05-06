import { api } from "@/lib/api";
import { Book } from "@/types/book";
import { Paginated } from "@/types/api";

export const getBooks = async (page = 1, limit = 10, search = "") => {
    const { data } = await api.get<Paginated<Book>>("/books", {
        params: { page, limit, search },
    });

    return data;
};

export const getBook = async (id: number) => {
    const { data } = await api.get<Book>(`/books/${id}`);

    return data;
};

export const createBook = async (payload: { name: string; author: string; photoUrl?: string; }) => {
    const { data } = await api.post<Book>("/books", payload);

    return data;
};

export const updateBook = async (id: number, payload: { name?: string; author?: string; photoUrl?: string }): Promise<Book> => {
    const { data } = await api.patch<Book>(`/books/${id}`, payload);

    return data;
};

export const deleteBook = async (id: number) => {
    const { data } = await api.delete(`/books/${id}`);

    return data;
};

export const sendExchangeRequest = async (id: number, message?: string) => {
    const { data } = await api.post(
        `/books/${id}/send-request`,
        { message }
    );

    return data;
};

export const getMyBooks = async (): Promise<Book[]> => {
    const { data } = await api.get<Book[]>("/me/books");

    return data;
};