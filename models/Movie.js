import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    imgTitle: { type: String },
    imgSmall: { type: String },
    trailer: { type: String },
    video: { type: String, required: true },
    year: { type: Number },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, required: true },
  },
  { timestamps: true }
); //creating a schema for the movie
