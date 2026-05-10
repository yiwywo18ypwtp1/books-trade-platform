import { Request, Response, NextFunction } from "express";
import { clerkMiddleware, getAuth, clerkClient } from "@clerk/express";
import { prisma } from "../db";

export const clerkExpressMiddleware = clerkMiddleware();

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const auth = getAuth(req);

        if (!auth.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const clerkId = auth.userId;

        let user = await prisma.user.findUnique({
            where: {
                clerkId,
            },
        });

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(clerkId);

            const email =
                clerkUser.emailAddresses[0]?.emailAddress;

            user = await prisma.user.create({
                data: {
                    clerkId,
                    email,
                    name:
                        clerkUser.firstName ||
                        clerkUser.username ||
                        "User",
                    password: "",
                },
            });
        }

        (req as any).user = user;

        next();
    } catch (err) {
        next(err);
    }
};