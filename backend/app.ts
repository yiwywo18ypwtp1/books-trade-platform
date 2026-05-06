import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import usersRouter from "./modules/routes/users.router"

import meRouter from "./modules/routes/me.router";
import authRouter from "./modules/routes/auth.router"
import booksRouter from "./modules/routes/books.router"



const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://books-trade-platform-o2eo.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());

app.use("/admin/users", usersRouter)

app.use("/me", meRouter);

app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.get("/", (req, res) => {
    res.json({ message: "API working" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
