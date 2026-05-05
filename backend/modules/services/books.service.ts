import { prisma } from "../../db";

import { BookCreate, BookUpdate } from "../../types/book";
import { HttpError } from "../../utils/HttpError";

export const create = async (userId: number, data: BookCreate) => {
    const book = await prisma.book.create({
        data: {
            ...data,
            ownerId: userId,
        },
    });

    return book;
};

export const findAll = async (page = 1, limit = 10, search?: string) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                { author: { contains: search, mode: "insensitive" as const } },
            ],
        }
        : {};

    const [books, total] = await Promise.all([
        prisma.book.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                owner: {
                    select: { id: true, name: true, email: true },
                },
            },
        }),
        prisma.book.count({ where }),
    ]);

    return {
        data: books,
        meta: { total, page, limit },
    };
};

export const getOne = async (id: number) => {
    const book = await prisma.book.findUnique({
        where: { id },
        include: {
            owner: {
                select: { id: true, name: true, email: true },
            },
        },
    });

    if (!book) throw new HttpError("Book not found", 404);

    return book;
};

export const update = async (id: number, userId: number, role: string, data: BookUpdate) => {
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) throw new HttpError("Book not found", 404);

    if (book.ownerId !== userId && role !== "ADMIN") {
        throw new HttpError("Forbidden", 403);
    }

    return prisma.book.update({
        where: { id },
        data,
    });
};

export const _delete = async (id: number, userId: number, role: string) => {
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) throw new HttpError("Book not found", 404);

    if (book.ownerId !== userId && role !== "ADMIN") {
        throw new HttpError("Forbidden", 403);
    }

    await prisma.book.delete({ where: { id } });

    return { message: "Book deleted" };
};

export const getMy = async (userId: number) => {
    return prisma.book.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: "desc" },
    });
};