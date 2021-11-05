import Router from "express";
import {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  getMovie,
  getRandomMovie,
} from "../controllers/movies.js";
import { verifyToken } from "../utils/jwt.js";

const router = Router();

// GET

router.get("/", getAllMovies);
router.get("/find", verifyToken, getMovie);
router.get("/find/:id", getMovieById);
router.get("/random", verifyToken, getRandomMovie);
// router.get("/stats", verifyToken, getStats);

// POST
router.post("/", verifyToken, createMovie);
// PUT
router.put("/:id", verifyToken, updateMovie);

// DELETE
router.delete("/:id", verifyToken, deleteMovie);

export default router;
