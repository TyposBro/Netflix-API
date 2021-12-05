import mongoose from "mongoose";
import validateEmail from "../utils/validateEmail.js";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validateEmail, "Invalid Email"],
      unique: true,
      lowercase: true,
    },
    avatar: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
