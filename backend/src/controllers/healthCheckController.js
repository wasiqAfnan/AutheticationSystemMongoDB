import { ApiError, ApiResponse } from "../utils/index.js";
import mongoose from "mongoose";

export const healthCheckController = (req, res) => {
    res.json({
        status: 200,
        message:
            "Test API is working. Go to /api/user/signup to signup or /api/user/login to login",
    });
};

export const dbPingController = async (req, res) => {
    try {
        const resp = await mongoose.connection.db.admin().ping();
        return res
            .status(200)
            .json(new ApiResponse("DB is up and running", 200, resp));
    } catch (err) {
        new ApiError("DB is down", 500);
    }
};
