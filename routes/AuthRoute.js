import express from "express";
import {
  changePassword,
  deleteAccount,
  getMe,
  login,
  resetPassword,
  signup,
  updateProfile,
} from "../controllers/AuthController.js";
import { Protected } from "../middleware/AuthMiddleware.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/signup", signup);
authRoute.get("/me", Protected, getMe);
authRoute.post("/reset-password", resetPassword);
authRoute.post("/change-password", Protected, changePassword);
authRoute.patch("/update-profile", Protected, updateProfile);
authRoute.delete("/delete-account", Protected, deleteAccount);

export default authRoute;
