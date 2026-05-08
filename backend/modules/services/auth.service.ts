import { prisma } from "../../db"

import { HttpError } from "../../utils/HttpError";

export const getMe = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    return user;
};