import { Router as expressRouter } from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = expressRouter();
router.post("/register", async (req, res) => {
  try {
    const { username, email } = req.body;
    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PRIVATE_KEY
    ).toString();
    const newUserObject = new User({ username, email, password });
    const user = await newUserObject.save();
    res.status(200).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] }).exec();
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PRIVATE_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.PRIVATE_KEY,
      { expiresIn: "1d" }
    );

    const { pwd, ...info } = user._doc;
    res.status(200).json({ info, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
