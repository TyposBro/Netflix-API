import Router from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getList,
  getStats,
} from "../controllers/users.js";
import { verifyToken } from "../utils/jwt.js";

const router = Router();

// GET
router.get("/find", getUser);
router.get("/", verifyToken, getList);
router.get("/stats", verifyToken, getStats);

// PUT
router.put("/:id", verifyToken, updateUser);

// DELETE
router.delete("/:id", verifyToken, deleteUser);

export default router;
