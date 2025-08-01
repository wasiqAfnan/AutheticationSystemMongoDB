import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import healthCheckRouter from "./routes/healthCheckRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.FRONTEND_URL, // production
        // origin: "http://localhost:5173", // don't put slash at last this will raise error in CORS
        credentials: true,
    })
);

// health check route
app.use("/api/test", healthCheckRouter);

// user route
app.use("/api/user", userRouter);

// handling all other incorrect routes
app.all(/./, (req, res) => {
    res.status(404).json({ message: "Invalid Routes" });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
