import mongoose, { Schema } from "mongoose";

const CourseDetailSchema = new Schema({
    title:{
        type: String,
    },
    description:{
        type: String
    },
    price:{
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps:true
})


export const coursesdb = mongoose.model("coursesdb", CourseDetailSchema)