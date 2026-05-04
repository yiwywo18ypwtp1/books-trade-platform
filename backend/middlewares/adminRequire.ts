import { Request, Response, NextFunction, RequestHandler } from "express";
import { HttpError } from "../utils/HttpError";
import { User } from "../types/user";

interface AuthRequest extends Request {
    user: User;
}

export const requireAdmin: RequestHandler = (req, res, next) => {
    const user = (req as AuthRequest).user;

    if (!user || user.role !== "ADMIN") {
        throw new HttpError("Forbidden", 403);
    }

    next();
};