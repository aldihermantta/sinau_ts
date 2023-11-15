import express from "express";
//import controller
import UserController from "../controllers/UserController";
//import validator
import user from "../middleware/validation/userValidator";

const Route = express.Router();

Route.get("/users", UserController.getUser);
Route.post("/users/insert", user.Register, UserController.createdUser);
Route.post("/users/login", UserController.UserLogin);

export default Route;