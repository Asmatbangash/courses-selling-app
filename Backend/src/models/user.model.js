import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    FullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


export const users = mongoose.model("users", userSchema)