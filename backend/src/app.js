import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", UserRouter);

// handling all other incorrect routes
app.all(/./, (req, res) => {
    res.status(404).json({ message: "Invalid Routes" });
});

// Error handling middleware
// app.use(errorMiddleware);

export default app;