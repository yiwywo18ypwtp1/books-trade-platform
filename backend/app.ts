import express from "express";
import cors from "cors";

import authRouter from "./modules/routes/auth.router"

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.json({ message: "API working" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
