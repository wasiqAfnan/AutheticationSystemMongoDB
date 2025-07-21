import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { ApiError, ApiResponse } from "../utils/index.js";

export const isLoggedIn = async (req, res, next) => {
    // get the token from cookie
    const token = req.cookies.accessToken;

    // validate
    if (!token) {
        throw new ApiError("Not logged in", 401);
    }
    try {
        // decode token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // finding user on db based on decoded token data
        const user = await User.findOne({ _id: payload.id });
        // validate user
        if (!user) {
            throw new ApiError("User does not exist with this email", 401);
        }
        // if user exist then setting up req.user obj to pass to handler
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        return next();
    } catch (error) {
        console.error("Auth error:", error);
        if (error instanceof ApiError) {
            return next(error);
        }

        // For all other errors, send a generic error message
        return next(new ApiError("Something went wrong during login", 500));
    }
};

export const isAuthorized =
    (...roles) =>
    async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError("You are not authorized to access this route", 403)
            );
        }
        next();
    };
