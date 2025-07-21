import express from "express";
const userRouter = express.Router();
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    userProfile,
} from "../controllers/userController.js";

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/profile").post(isLoggedIn, userProfile);

export default userRouter;
