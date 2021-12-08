import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import router from "./routes/Router.js";
const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => {
    console.log("DB is up!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.listen(process.env.PORT || 3001, () => {
  console.log("Server's Running");
});
