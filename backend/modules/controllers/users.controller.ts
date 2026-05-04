import { Request, Response } from "express";

import * as usersService from "../services/users.service"
import { UserCreate, UserUpdate } from "../../types/user";

export const createUser = async (req: Request<{}, {}, UserCreate>, res: Response) => {
    try {
        const data = req.body;
        const result = await usersService.create(data);

        await res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const result = await usersService.getOne(id);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await usersService.findAll(page, limit);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const updateUser = async (req: Request<{ id: string }, {}, UserUpdate>, res: Response) => {
    try {
        const id = Number(req.params.id);

        const result = await usersService.update(id, req.body);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const result = await usersService._delete(id);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};