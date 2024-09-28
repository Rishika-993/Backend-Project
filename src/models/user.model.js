import mongoose, { Schema } from "mongoose";

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

export const User = mongoose.model("User", userSchema);