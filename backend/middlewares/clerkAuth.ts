import { Request, Response, NextFunction } from "express";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { prisma } from "../db";

export const clerkExpressMiddleware = clerkMiddleware();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = getAuth(req);

        if (!auth.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const clerkId = auth.userId;

        let user = await prisma.user.findUnique({
            where: {
                clerkId,
            },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    clerkId,
                    email: `${clerkId}@temp.local`,
                    name: "User",
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