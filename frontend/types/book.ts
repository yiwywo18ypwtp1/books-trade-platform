import { User } from "./user";

export type Book = {
    id: number;
    name: string;
    author: string;
    photoUrl: string | null;
    ownerId: number;
    createdAt: string;
    updatedAt: string;

    owner?: Pick<User, "id" | "name" | "email">;
};