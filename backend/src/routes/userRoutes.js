import express from "express";
const UserRouter = express.Router();
import { registerUser, loginUser } from "../controllers/authController.js"

// test route
UserRouter.get("/test", (req, res) => {
    res.json({
        status: 200,
        message:
            "Test API is working. Go to /api/auth/signup to signup or /api/auth/login to login",
    });
});

// signup route
UserRouter.post("/signup", registerUser);

// login route
UserRouter.post("/login", loginUser);

export default UserRouter;
