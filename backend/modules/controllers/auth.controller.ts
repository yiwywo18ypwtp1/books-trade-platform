import type { Request, Response } from "express";

import * as authService from "../services/auth.service"
import { UserSignup, UserLogin } from "../../types/user";

export const signup = async (req: Request<UserSignup>, res: Response,) => {
    try {
        const { name, password, email } = req.body;
        const result = await authService.signup({ name, email, password });

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
}

export const login = async (req: Request<UserLogin>, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.login({ email, password });
        res.json(result);

    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        const userFromToken = (req as any).user;

        const user = await authService.getMe(userFromToken.id);

        res.json({ user });
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message || "Server error",
        });
    }
};