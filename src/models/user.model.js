import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullname:{
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,       //cloudinary image url
            required: true,
        },
        coverImage:{
            type: String,   
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is required"],   //custom error message can be provided with any true value
        },
        refreshToken:{
            type: String,
        }
    },
    {
        timestamps: true,     //provides createdAt and updatedAt fields
    }
)

//arrow function does not have this context which is necessary here so cant use it

userSchema.pre("save", async function (next) {             //next necessary for middleware
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

//designing custom methods for bcrypt
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export const User = mongoose.model("User", userSchema);