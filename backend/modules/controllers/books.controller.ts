import { Request, Response } from "express";

import * as service from "../services/books.service";
import { BookCreate, BookUpdate } from "../../types/book";

export const createBook = async (req: Request<{}, {}, BookCreate>, res: Response) => {
    try {
        const user = (req as any).user;

        const result = await service.create(user.id, req.body);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const getBooks = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string;

        const result = await service.findAll(page, limit, search);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const getBook = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await service.getOne(id);
        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const updateBook = async (req: Request<{ id: string }, {}, BookUpdate>, res: Response) => {
    try {
        const user = (req as any).user;
        const id = Number(req.params.id);

        const result = await service.update(
            id,
            user.id,
            user.role,
            req.body
        );

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const id = Number(req.params.id);

        const result = await service._delete(
            id,
            user.id,
            user.role
        );

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const getMyBooks = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const result = await service.getMy(user.id);

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
};