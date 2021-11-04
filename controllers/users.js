import User from "../models/User.js";
import CryptoJS from "crypto-js";

// GET USER
export const getUser = async (req, res) => {};

// CREATE

// UPDATE
export const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PRIVATE_KEY
      ).toString();
    }
    try {
      const { password, ...info } = await User.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json(info);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(401).json({
      msg: "You are not authorized to update this user",
    });
  }
};

// DELETE
