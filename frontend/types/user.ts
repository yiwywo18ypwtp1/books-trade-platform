export type User = {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
};

export type UserLogin = {
    email: string;
    password: string;
};

export type UserSignup = {
    name: string
    email: string;
    password: string;
};