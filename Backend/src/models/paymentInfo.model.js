import mongoose, { Schema } from "mongoose";

const paymentInfoSchema = new Schema({
     userId: String,
    email: String,
    courseId: String,
    paymentId: String,
    amount: Number,
    status: String
   
}, {
    timestamps: true
})


export const paymentInfo = mongoose.model("paymentInfo", paymentInfoSchema)