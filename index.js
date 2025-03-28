import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
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
