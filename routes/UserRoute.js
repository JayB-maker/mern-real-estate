import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
import { Protected } from "../middleware/AuthMiddleware.js";
import { statusEnum } from "../utils/Enums.js";



const userRoute = express.Router();

userRoute.get("/status-enum", (req, res) => {
    const formattedEnum = {};
    for (const value of statusEnum) {
      formattedEnum[value] = value.toUpperCase();
    }
    console.log(formattedEnum)
    res.json(formattedEnum);
  });

userRoute.get("/", Protected, getUsers);
userRoute
  .route("/:id")
  .get(Protected, getUser)
  .patch(Protected, updateUser)
  .delete(Protected, deleteUser);



export default userRoute;
