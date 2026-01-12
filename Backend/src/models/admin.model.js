import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
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


export const Admin = mongoose.model("admin", adminSchema)