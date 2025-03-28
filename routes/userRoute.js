import express from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";

//setup express router
const route = express.Router();

//creating routes
route.post("/user", createUser);
route.get("/users", getAllUsers);

export default route;
