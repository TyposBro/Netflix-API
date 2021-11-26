import MovieSchema from "../models/Movie.js";

// GET MOVIE
export const getMovie = async (req, res) => {
  try {
    const movie = await MovieSchema.findOne(req.body);
    res.json(movie);
  } catch (error) {
    res.json({ message: error });
  }
};

// GET MOVIE
export const getMovieById = async (req, res) => {
  // async function
  try {
    // console.log(req.params.id);
    const movie = await MovieSchema.findById(req.params.id);
    // console.log(movie);
    res.json(movie);
  } catch (error) {
    res.json({ message: error });
  }
};
// GET ALL MOVIES
export const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieSchema.find();
    res.json(movies.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET RANDOM MOVIE
export const getRandomMovie = async (req, res) => {
  const isSeries = req.query.type === "series" ? true : false;
  try {
    const movie = await MovieSchema.aggregate([
      { $match: { isSeries } },
      { $sample: { size: 1 } },
    ]);

    res.status(200).json(movie[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
export const createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new MovieSchema(req.body);
    try {
      const movie = await newMovie.save();

      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

// UPDATE
export const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movie = await MovieSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// DELETE
export const deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await MovieSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Movie deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
