import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
import { Protected } from "../middleware/AuthMiddleware.js";



const userRoute = express.Router();

userRoute.get("/", Protected, getUsers);
userRoute
  .route("/:id")
  .get(Protected, getUser)
  .patch(Protected, updateUser)
  .delete(Protected, deleteUser);



export default userRoute;
