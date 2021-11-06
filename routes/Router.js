import { Router } from "express";
import userRouter from "./users.js";
import authRouter from "./auth.js";
import movieRouter from "./movies.js";
import listRouter from "./lists.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/movies", movieRouter);
router.use("/lists", listRouter);

export default router;
