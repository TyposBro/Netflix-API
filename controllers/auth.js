import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

//  TODO: Validate user input

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isAdmin = password === process.env.PRIVATE_KEY ? true : false;

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.PRIVATE_KEY
  ).toString();
  const newUser = new User({
    username,
    email,
    password: encryptedPassword,
    isAdmin,
  });
  try {
    const user = await newUser.save();
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
// TODO: IMPLEMENTATE ROLES BASED AUTHENTICATION
export const login = async (req, res) => {
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
};
