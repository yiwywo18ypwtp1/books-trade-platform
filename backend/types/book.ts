export type Book = {
    id: number
    name: string
    author: string
    photoUrl?: string | null
}

export type BookCreate = {
    name: string
    author: string
    photoUrl?: string
}

export type BookUpdate = {
    name?: string
    author?: string
    photoUrl?: string
}