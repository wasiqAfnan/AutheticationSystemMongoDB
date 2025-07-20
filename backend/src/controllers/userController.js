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
            throw new ApiError("User already exists with this email or contact no", 400);
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
        return next(
            new ApiError("Something went wrong during registration", 500)
        );
    }
};

// Login controller
const loginUser = async (req, res) => {};

export { registerUser, loginUser };
