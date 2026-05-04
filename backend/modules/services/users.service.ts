import { UserRole } from "@prisma/client";
import { prisma } from "../../db";

import { UserCreate, UserUpdate } from "../../types/user";
import { hashPass } from "../../utils/hashPass";
import { HttpError } from "../../utils/HttpError";

export const create = async (data: UserCreate) => {
    const userExists = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (userExists) {
        throw new HttpError("User already exists", 409);
    }

    const hashedPassword = await hashPass(data.password)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role
        },
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role ?? UserRole.USER,
    }
}

export const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: limit,
            orderBy: { id: "asc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        }),
        prisma.user.count(),
    ]);

    return {
        data: users,
        meta: {
            total,
            page,
            limit,
        },
    };
};

export const getOne = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id },
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

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
};

export const update = async (id: number, data: UserUpdate) => {
    const userExists = await prisma.user.findUnique({
        where: { id },
    });

    if (!userExists) {
        throw new HttpError("User not found", 404);
    }

    if (data.password) {
        data.password = await hashPass(data.password);
    }

    if (data.email) {
        const existingEmail = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingEmail && existingEmail.id !== id) {
            throw new HttpError("Email already in use", 409);
        }
    }

    const user = await prisma.user.update({
        where: { id },
        data: data,
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
};

export const _delete = async (id: number) => {
    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        throw new HttpError("User not found", 404);
    }

    await prisma.user.delete({
        where: { id },
    });

    return { message: "User deleted" };
};