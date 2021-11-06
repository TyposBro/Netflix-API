import ListSchema from "../models/List.js";

// CREATE
export const createList = async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new ListSchema(req.body);
    try {
      const list = await newList.save();

      res.status(201).json(list);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

// UPDATE
export const updateList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const list = await ListSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

// DELETE
export const deleteList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await ListSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "List deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

// GET LIST
export const getList = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await ListSchema.aggregate([
          { $match: { type: typeQuery, genre: genreQuery } },
          { $sample: { size: 10 } },
        ]);
      } else {
        list = await ListSchema.aggregate([
          { $match: { type: typeQuery } },
          { $sample: { size: 10 } },
        ]);
      }
    } else {
      list = await ListSchema.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.json({ message: error });
  }
};
