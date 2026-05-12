import { prisma } from "../../db"
import { htmlRequestAccepted } from "../../utils/exchangeRequestHTMLTemplate";

import { HttpError } from "../../utils/HttpError";
import { sendMail } from "./mail.service";

export const incoming = async (id: number) => {
    const requests = await prisma.exchangeRequest.findMany(
        {
            where: { receiverId: id },
            include: {
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                book: true,
                offeredBook: true,
            },
        }
    );

    return requests;
}

export const outgoing = async (id: number) => {
    const request = await prisma.exchangeRequest.findMany({
        where: { senderId: id },
        include: {
            receiver: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            sender: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            book: true,
            offeredBook: true,
        },
    });

    if (!request) throw new HttpError("Request not found", 404);

    return request;
}

export const accept = async (id: number, currentUserId: number) => {
    const request = await prisma.exchangeRequest.findUnique({
        where: { id: id },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            receiver: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
        }
    });

    if (!request) throw new HttpError("Request not found", 404);

    if (request.receiverId !== currentUserId) throw new HttpError("Forbidden", 403);

    if (request.status !== "PENDING") {
        throw new HttpError("Request already processed", 400);
    }

    const result = await prisma.$transaction([
        prisma.exchangeRequest.update({
            where: {
                id: id,
            },
            data: {
                status: "ACCEPTED",
            },
        }),

        prisma.book.update({
            where: {
                id: request.bookId,
            },
            data: {
                ownerId: request.senderId,
            },
        }),

        prisma.book.update({
            where: {
                id: request.offeredBookId,
            },
            data: {
                ownerId: request.receiverId,
            },
        }),
    ]);

    let message = `
        Hey! Great news 📚✨

        Your book exchange request has been accepted.

        The owner agreed to exchange books with you. You can now contact each other and arrange the details of the exchange.
    `;


    await sendMail(request.sender.email, "Your book exchange request was accepted", message);

    return result;
}

export const reject = async (id: number, currentUserId: number) => {
    const request = await prisma.exchangeRequest.findUnique({
        where: { id: id },
        include: {
            sender: true,
            receiver: true,
        }
    });

    if (!request) throw new HttpError("Request not found", 404);

    if (request.receiverId !== currentUserId) throw new HttpError("Forbidden", 403);

    if (request.status !== "PENDING") {
        throw new HttpError("Request already processed", 400);
    }

    const result = await prisma.exchangeRequest.update({
        where: { id: id },
        data: {
            status: "REJECTED"
        }
    })

    let message = `
        Hey!

        Unfortunately, your book exchange request was declined 😔

        Don’t worry — there are still plenty of other books and exchange opportunities waiting for you on Books Trade 📚
    `;


    await sendMail(request.sender.email, "Your book exchange request was rejected", message);

    return result;
}