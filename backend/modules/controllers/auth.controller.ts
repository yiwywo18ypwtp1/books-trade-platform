import type { Request, Response } from "express";

import * as authService from "../services/auth.service"

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