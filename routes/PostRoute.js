import express from "express";
import { getPostList } from "../controllers/PostController.js";

const postRoute = express.Router();

postRoute.route("/").get(getPostList);

export default postRoute;
