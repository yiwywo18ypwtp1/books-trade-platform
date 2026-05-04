import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import { UserOutput } from "../types/user"
import { HttpError } from "../utils/HttpError";


const ALGORITHM = "HS256"

if (!process.env.JWT_SECRET_KEY)
    throw new Error('JWT_SECRET_KEY is not set');

const secretKey = process.env.JWT_SECRET_KEY


export const generate_token = async (data: UserOutput) => {
    const token = jwt.sign(
        data,
        secretKey,
        {
            algorithm: ALGORITHM,
            expiresIn: "1h",
        }
    )

    return token;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new HttpError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        const err = new Error("Invalid token format") as any;
        err.status = 401;
        throw err;

        throw new HttpError("Invalid token", 401);
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        (req as any).user = decoded

        next()
    } catch (err: any) {
        err.status = 401;
        throw err;
    }
}