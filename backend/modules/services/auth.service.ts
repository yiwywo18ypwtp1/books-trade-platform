import { prisma } from "../../db"

import { checkPass, hashPass } from "../../utils/hashPass";
import { generate_token } from "../../middlewares/JWTAuth";
import { UserLogin, UserSignup } from "../../types/user";
import { UserRole } from "@prisma/client";
import { HttpError } from "../../utils/HttpError";


export const signup = async ({ name, email, password }: UserSignup) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new HttpError("User already exists", 409);
    }

    const hashedPassword = await hashPass(password);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: UserRole.USER
        },
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
}

export const login = async ({ email, password }: UserLogin) => {
    const existUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!existUser) {
        throw new HttpError("No User with this email exists", 404);
    }

    const isValid = await checkPass(password, existUser.password);

    if (!isValid) {
        throw new HttpError("Invalid credentials", 401);
    }

    const token = await generate_token({
        id: existUser.id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
    });

    return {
        token,
        user: {
            id: existUser.id,
            name: existUser.name,
            email: existUser.email,
            role: existUser.role
        },
    };
}

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