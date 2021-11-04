import Router from "express";
import { updateUser } from "../controllers/users.js";
import { verifyToken } from "../utils/jwt.js";

const router = Router();

// UPDATE USER
router.put("/:id", verifyToken, updateUser);

export default router;
