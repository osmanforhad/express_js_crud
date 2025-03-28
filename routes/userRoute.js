import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

//setup express router
const route = express.Router();

//creating routes
route.post("/user", createUser);
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);

export default route;
