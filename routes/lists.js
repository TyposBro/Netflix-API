import Router from "express";
import {
  createList,
  getList,
  updateList,
  deleteList,
} from "../controllers/lists.js";
import { verifyToken } from "../utils/jwt.js";

const router = Router();

// GET
router.get("/", getList);

// POST
router.post("/", verifyToken, createList);

// PUT
router.put("/:id", verifyToken, updateList);

// DELETE
router.delete("/:id", verifyToken, deleteList);

export default router;
