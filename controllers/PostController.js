import { createPostModel } from "../models/PostModel.js";
import { postListModel } from "../models/PostModel.js";

export const getPostList = async (req, res) => {
  try {
    const post = await postListModel.find();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
