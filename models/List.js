import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model("List", ListSchema);
