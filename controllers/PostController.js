import mongoose from "mongoose";
import { createPostModel } from "../models/PostModel.js";

export const getPostLists = async (req, res) => {
  try {
    const { propertyType, page = 1, limit = 3, search } = req.query;

    const query = {};
    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const posts = await createPostModel
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate({ path: "user", select: "firstName lastName image" })
      .select(
        "title address latitude longitude propertyType images price bedroom bathroom squareFootage user"
      );

    const totalItems = await createPostModel.countDocuments(query);

    res.status(200).json({
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalItems: totalItems,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const user = req.user;

    console.log(user);

    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      title,
      description,
      address,
      latitude,
      longitude,
      propertyType,
      images,
      features,
      price,
      bedroom,
      bathroom,
      squareFootage,
    } = req.body;

    const newPost = new createPostModel({
      title,
      description,
      address,
      latitude,
      longitude,
      propertyType,
      images,
      features,
      price,
      bedroom,
      bathroom,
      squareFootage,
      user: user.id,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDetailedPost = async (req, res) => {
  try {
    // Check if postIdToFetch is a valid ObjectId

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await createPostModel.findById(req.params.id).populate({
      path: "user",
      select: "firstName lastName email phoneNumber gender image role", // Specify the user fields you need
    });
    // .select('title description address latitude longitude propertyType images features price bedroom bathroom squareFootage user'); // Specify the post fields you need

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);

    // const user = await userModel.findById(post.user);

    // res.status(200).json({ ...post, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      latitude,
      longitude,
      propertyType,
      images,
      features,
      price,
      bedroom,
      bathroom,
      squareFootage,
    } = req.body;

    const user = req.user;

    const postToUpdate = await createPostModel.findById(req.params.id);
    if (!postToUpdate) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      !user ||
      (!postToUpdate.user.equals(user.id) && user.role !== "SUPER_ADMIN")
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (title) postToUpdate.title = title;
    if (description) postToUpdate.description = description;
    if (address) postToUpdate.address = address;
    if (latitude) postToUpdate.latitude = latitude;
    if (longitude) postToUpdate.longitude = longitude;
    if (propertyType) postToUpdate.propertyType = propertyType;
    if (images) postToUpdate.images = images;
    if (features) postToUpdate.features = features;
    if (price) postToUpdate.price = price;
    if (bedroom) postToUpdate.bedroom = bedroom;
    if (bathroom) postToUpdate.bathroom = bathroom;
    if (squareFootage) postToUpdate.squareFootage = squareFootage;

    await postToUpdate.save();
    res.status(200).json(postToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    // Check if postIdToDelete is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = req.user;

    const postToDelete = await createPostModel.findById(req.params.id);

    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is either the post owner or a SUPER_ADMIN
    if (
      !user ||
      (!postToDelete.user.equals(user._id) && user.role !== "SUPER_ADMIN")
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await createPostModel.deleteOne({ id: postToDelete.id });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
