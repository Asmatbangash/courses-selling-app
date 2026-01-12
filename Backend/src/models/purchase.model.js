import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course", 
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const purchase = mongoose.model("purchase", purchaseSchema);
