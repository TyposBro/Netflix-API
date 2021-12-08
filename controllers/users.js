import User from "../models/User.js";
import CryptoJS from "crypto-js";

// GET USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    const { id, username, email, isAdmin } = user;
    res.status(200).json({ id, username, email, isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE
export const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    // if (req.body.password) {
    //   req.body.password = CryptoJS.AES.encrypt(
    //     req.body.password,
    //     process.env.PRIVATE_KEY
    //   ).toString();
    // }
    try {
      const info = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(info);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to update this user",
    });
  }
};

// DELETE
export const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      const info = await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "The user has been deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to delete this user",
    });
  }
};

// GET LIST OF USERS
export const getList = async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(401).json({ message: "You are not authorized" });
  }
};

// GET USER STATS
export const getStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.getFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
