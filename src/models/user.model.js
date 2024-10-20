import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import e from "express";

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

userSchema.pre("save", async function (next) {             //next keyword necessary for middleware
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
    return jwt.sign(
        { 
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
         }, 
         process.env.ACCESS_TOKEN_SECRET, 
         { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    );
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
         }, 
         process.env.REFRESH_TOKEN_SECRET, 
         { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const User = mongoose.model("User", userSchema);