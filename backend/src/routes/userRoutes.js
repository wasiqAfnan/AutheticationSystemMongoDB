import express from "express";
const userRouter = express.Router();
import { isLoggedIn, isAuthorized } from "../middlewares/authMiddleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    userProfile,
    userAnalytics
} from "../controllers/userController.js";

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/profile").post(isLoggedIn, userProfile);
userRouter.route("/analytics").post(isLoggedIn, isAuthorized("ADMIN"), userAnalytics);

export default userRouter;
