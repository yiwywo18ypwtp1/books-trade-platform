
import { Book } from "@/types/book";
import { Paginated } from "@/types/api";

import { api } from "@/lib/api";
import { AxiosInstance } from "axios";

export const getBooks = async (page = 1, limit = 10, search = "") => {
    const { data } = await api.get<Paginated<Book>>("/books", {
        params: { page, limit, search },
    });

    return data;
};

export const getBook = async (api: AxiosInstance, id: number) => {
    const { data } = await api.get<Book>(`/books/${id}`);

    return data;
};

export const getRelated = async (api: AxiosInstance, id: number) => {
    const { data } = await api.get(`/books/${id}/related`);

    return data
}

export const createBook = async (api: AxiosInstance, payload: { name: string; author: string; photoUrl?: string; }) => {
    const { data } = await api.post<Book>("/books", payload);

    return data;
};

export const updateBook = async (api: AxiosInstance, id: number, payload: { name?: string; author?: string; photoUrl?: string }): Promise<Book> => {
    const { data } = await api.patch<Book>(`/books/${id}`, payload);

    return data;
};

export const deleteBook = async (api: AxiosInstance, id: number) => {
    const { data } = await api.delete(`/books/${id}`);

    return data;
};

export const sendExchangeRequest = async (api: AxiosInstance, id: number, message?: string) => {
    const { data } = await api.post(
        `/books/${id}/send-request`,
        { message }
    );

    return data;
};

export const getMyBooks = async (api: AxiosInstance): Promise<Book[]> => {
    const { data } = await api.get<Book[]>("/me/books");

    return data;
};