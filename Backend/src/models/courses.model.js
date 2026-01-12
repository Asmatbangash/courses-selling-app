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
    },
    creatorId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
}, {
    timestamps: true
})


export const course = mongoose.model("course", CourseDetailSchema)