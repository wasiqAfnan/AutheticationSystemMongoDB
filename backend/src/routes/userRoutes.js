import express from "express";
const userRouter = express.Router();
import { registerUser, loginUser } from "../controllers/authController.js"

// signup route
userRouter.post("/signup", registerUser);

// login route
userRouter.post("/login", loginUser);

export default userRouter;
