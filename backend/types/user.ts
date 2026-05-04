import { UserRole } from "@prisma/client"

export type User = {
    id: number
    name: string
    email: string
    role: UserRole
}

export type UserSignup = {
    name: string
    email: string
    password: string
}

export type UserLogin = {
    email: string
    password: string
}

export type UserOutput = User
