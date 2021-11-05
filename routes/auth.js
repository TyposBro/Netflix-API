import { Router as expressRouter } from "express";
import { check, validationResult } from "express-validator";
import { register, login } from "../controllers/auth.js";

//  TODO: Validate user input

const router = expressRouter();
router.post("/register", register);
// TODO: IMPLEMENTATE ROLES BASED AUTHENTICATION
router.post("/login", login);

export default router;
