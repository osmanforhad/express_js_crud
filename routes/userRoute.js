import express from "express";
import { createUser } from "../controllers/userController.js";

//setup express router
const route = express.Router();

//creating routes
route.post("/user", createUser);

export default route;
