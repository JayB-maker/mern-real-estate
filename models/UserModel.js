import mongoose from "mongoose";
import { genderTypeEnum, roleTypeEnum } from "../utils/Enums.js";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"],
  },
  gender: {
    type: String,
    enum: genderTypeEnum,
    required: [true, "Please enter gender"],
  },
  image: {
    type: String,
    required: [true, "Please select an image"],
  },
  role: {
    type: String,
    enum: roleTypeEnum,
    required: [true, "Please select a role"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});

export const userModel = mongoose.model("User", userSchema);
