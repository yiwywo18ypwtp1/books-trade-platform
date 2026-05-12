import { Request, Response } from "express";

import * as service from "../services/requests.service"

export const getIncoming = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const result = await service.incoming(user.id);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

export const getOutgoing = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const result = await service.outgoing(user.id);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

export const acceptRequest = async (req: Request, res: Response) => {
    try {
        const requestId = Number(req.params.id);

        const user = (req as any).user;

        const result = await service.accept(
            requestId,
            user.id
        );

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

export const rejectRequest = async (req: Request, res: Response) => {
    try {
        const requestId = Number(req.params.id);

        const user = (req as any).user;

        const result = await service.reject(
            requestId,
            user.id
        );

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
}