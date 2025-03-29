import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Database Connection Successfull");
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
      });
    });
  } catch (error) {
    throw error;
  }
};
DbConnection();

app.use("/api", route);
