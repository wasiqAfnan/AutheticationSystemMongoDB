import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import healthCheckRouter from "./routes/healthCheckRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://accessifywasiq.netlify.app/",
  "https://accessify-lime.vercel.app/",
  "https://accessify-wasiq-afnan-ansaris-projects.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        // Origin is allowed
        callback(null, true);
      } else {
        // Origin not allowed
        callback(new Error("Not allowed by CORS"));
      }
    },
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
