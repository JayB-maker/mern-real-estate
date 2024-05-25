import mongoose from "mongoose";
import { propertyTypeEnum } from "../utils/Enums.js";

const createPostSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, "Please Enter a title"],
  },
  description: {
    type: String,
    require: [true, "Please Enter a description"],
  },
  address: {
    type: String,
    require: [true, "Please Enter a address"],
  },
  latitude: {
    type: String,
    require: [true, "Please Enter a latitude"],
  },
  longitude: {
    type: String,
    require: [true, "Please Enter a longitude"],
  },
  propertyType: {
    type: String,
    enum: propertyTypeEnum,
    require: [true, "Please Enter a property type"],
  },
  images: {
    type: [String],
    require: [true, "Please select an image"],
  },
  features: {
    type: [String],
    require: [false, "Please enter a feature"],
  },
  price: {
    type: Number,
    require: [true, "Please Enter price"],
  },
  bedroom: {
    type: Number,
    require: [true, "Please Enter number of bedroom"],
  },
  bathroom: {
    type: Number,
    require: [true, "Please Enter number of bathroom"],
  },
  squareFootage: {
    type: String,
    require: [true, "Please Enter squareFootage"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const createPostModel = mongoose.model(
  "Post",
  createPostSchema
);
