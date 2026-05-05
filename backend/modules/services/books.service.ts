import { prisma } from "../../db";

import { BookCreate, BookUpdate } from "../../types/book";
import { HttpError } from "../../utils/HttpError";
import { sendMail } from "./mail.service";

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

export const exchangeRequest = async (id: number, userId: number, message?: string) => {
    const book = await prisma.book.findUnique({
        where: { id },
        include: {
            owner: {
                select: { id: true, name: true, email: true },
            },
        }
    });

    const senderBooks = await prisma.book.findMany({ where: { id: userId } });

    if (!book) throw new HttpError("Book not found", 404);

    if (book.ownerId == userId) {
        throw new HttpError("You can't send a request to urself", 400);
    }

    const receiver = book.owner;

    const sender = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    if (!sender) throw new HttpError("Sender not found", 404);

    let finalMessage = message ?? "Hey! I want to exchange books with you 📚";

    const html = `
    <div style="font-family: Arial, sans-serif; background:#f6f8fa; padding:20px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; padding:20px;">
        
        <h2 style="margin-top:0;">📚 Book Exchange Request</h2>
        
        <p>
          <b>${sender.name}</b> wants to exchange books with you.
        </p>
    
        <p style="margin:15px 0;">
          <b>Message:</b><br/>
          ${finalMessage}
        </p>
    
        <div style="margin-top:20px;">
          <b>Sender books:</b>
          <ul style="padding-left:20px;">
            ${senderBooks.map(b => `<li>${b.name} — ${b.author}</li>`).join("")}
          </ul>
        </div>
    
        <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
    
        <p style="font-size:12px; color:#888;">
          This email was sent automatically by Book Exchange service.
        </p>
    
      </div>
    </div>
    `

    await sendMail(receiver.email, "Book exchange request", finalMessage, html);

    const request = await prisma.exchangeRequest.create({
        data: {
            senderId: userId,
            receiverId: receiver.id,
            bookId: book.id,
            message: finalMessage,
        }
    });

    return request;
}