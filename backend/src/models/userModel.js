import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        contact: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false, // secure option: don't return password by default
        },
    },
    {
        timestamps: true,
    }
);

// it's a pre-defined mongoDB hook that will run automatically when save()
// function has been called in user.controllers.js
/*userSchema.pre("save", async function (next) {
    if (!this.isModified("uPass")) {
        return next();
    }

    this.uPass = await bcrypt.hash(this.uPass, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    console.log(this.uPass);

    return await bcrypt.compare(password, this.uPass);
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({ id: this._id }, constants.JWT_SECRET, {
        expiresIn: constants.JWT_EXPIRY,
    });
};*/

const User = mongoose.model("User", UserSchema);

export default User;
