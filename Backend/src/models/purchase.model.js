import mongoose, { Schema } from "mongoose";
import { users } from "./user.model.js";
import { coursesdb } from "./courses.model.js";

const purchaseSchema = new Schema({
   userId: {
    type:mongoose.Types.ObjectId,
    ref: users
   },
   courseId:{
    type: mongoose.Types.ObjectId,
    ref: coursesdb
   }
}, {
    timestamps: true
})


export const purchase = mongoose.model("purchase", purchaseSchema)