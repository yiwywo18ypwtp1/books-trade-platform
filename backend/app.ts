import express from "express";
import cors from "cors";

import usersRouter from "./modules/routes/users.router"

import authRouter from "./modules/routes/auth.router"
import booksRouter from "./modules/routes/books.router"


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/admin/users", usersRouter)

app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.get("/", (req, res) => {
    res.json({ message: "API working" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
