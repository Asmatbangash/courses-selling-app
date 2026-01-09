import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coursesdb", 
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const purchase = mongoose.model("purchase", purchaseSchema);
