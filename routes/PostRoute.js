import express from "express";
import {
  createPost,
  deletePost,
  getDetailedPost,
  getPostLists,
  updatePost,
} from "../controllers/PostController.js";
import { Protected } from "../middleware/AuthMiddleware.js";

const postRoute = express.Router();

postRoute.route("/").get(getPostLists).post(Protected, createPost);
postRoute
  .route("/:id")
  .delete(Protected, deletePost)
  .patch(Protected, updatePost)
  .get(getDetailedPost);

export default postRoute;
