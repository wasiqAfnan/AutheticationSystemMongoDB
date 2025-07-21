import User from "../models/userModel.js";
import { ApiError, ApiResponse } from "../utils/index.js";

const registerUser = async (req, res, next) => {
    try {
        const { name, contact, email, password } = req.body;

        // get name, email and pw from body
        // validate
        if (!(name && contact && email && password)) {
            throw new ApiError("All field must be passed", 400);
        }

        // check if user have passed empty string in any of the field
        if (
            [name, contact, email, password].some(
                (field) => typeof field !== "string" || field.trim() === ""
            )
        ) {
            return next(
                new ApiError("All fields must be non-empty strings", 400)
            );
        }

        // validate if user exists
        let user = await User.findOne({
            $or: [{ email }, { contact }],
        });
        if (user) {
            throw new ApiError(
                "User already exists with this email or contact no",
                400
            );
        }

        // save to db
        user = new User({
            name,
            contact,
            email,
            password,
        });

        const savedUser = await user.save();

        savedUser.password = undefined;
        // send response
        return res
            .status(201)
            .json(new ApiResponse("User Created Successfully", 201, savedUser));
    } catch (error) {
        console.log("Some Error Occured: ", error);
        // If the error is already an instance of ApiError, pass it to the error handler
        if (error instanceof ApiError) {
            return next(error);
        }

        // For all other errors, send a generic error message
        return next(new ApiError("Something went wrong during sigup", 500));
    }
};

// Login controller
const loginUser = async (req, res, next) => {
    try {
        // get email and pw from body
        const { email, password } = req.body;
        // validate
        if (!(email && password)) {
            throw new ApiError("All field must be passed", 400);
        }

        // check if user have passed empty string in any of the field
        if (
            [email, password].some(
                (field) => typeof field !== "string" || field.trim() === ""
            )
        ) {
            throw new ApiError("All field must be passed", 400);
        }

        // validate if user exists
        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new ApiError(
                "User does not exists with this email or email is invalid",
                400
            );
        }
        // compare pw hashed
        const matchedPw = await user.isPasswordCorrect(password);
        if (!matchedPw) {
            throw new ApiError("Password is invalid", 400);
        }

        user.password = undefined;
        // token create
        const token = await user.generateAccessToken();

        // send cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // send response
        return res
            .status(200)
            .json(new ApiResponse("Login Successful", 200, user));
    } catch (error) {
        console.log("Some Error Occured: ", error);
        // If the error is already an instance of ApiError, pass it to the error handler
        if (error instanceof ApiError) {
            return next(error);
        }

        // For all other errors, send a generic error message
        return next(new ApiError("Something went wrong during login", 500));
    }
};

const logoutUser = async (req, res) => {
    res.status(200)
        .clearCookie("accessToken")
        .json(new ApiResponse("Logout successful", 200));
};

const userProfile = async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse("Profile Access Successful", 200, req.user));
};

const userAnalytics = async (req, res, next) => {
    try {
        const userData = await User.find();
        if (!userData) {
            throw new ApiError("Error occured while fetching from DB", 500);
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    "You are authroized to access this route",
                    200,
                    userData
                )
            );
    } catch (error) {
        console.log("Access Error: ", error);

        if (error instanceof ApiError) {
            return next(error);
        }

        // For all other errors, send a generic error message
        return next(
            new ApiError("Something went wrong while getting the data", 500)
        );
    }
};

export { registerUser, loginUser, logoutUser, userProfile, userAnalytics };
