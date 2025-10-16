import mongoose, { Schema } from "mongoose";

const CourseDetailSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
}, {
    timestamps: true
})


export const coursesdb = mongoose.model("coursesdb", CourseDetailSchema)