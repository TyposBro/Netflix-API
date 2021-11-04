import { Router } from "express";
import userRouter from "./users.js";
import authRouter from "./auth.js";
// import movieRouter from "./movies.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
