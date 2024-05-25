import mongoose from "mongoose";
import { userModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const user = req.user;
    if (!user && user.role !== "SUPER_ADMIN") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const query = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const users = await userModel.find(query).skip(skip).limit(parseInt(limit));

    const totalItems = await userModel.countDocuments(query);
    res
      .status(200)
      .json({
        totalItems,
        currentPage: parseInt(page),
        limit: parseInt(limit),
        users,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userIdToFetch = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(userId);
    if (!user || user.role !== "SUPER_ADMIN") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if userIdToFetch is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userIdToFetch)) {
      return res.status(404).json({ message: "User not found" });
    }

    const userToFetch = await userModel.findById(userIdToFetch);
    if (!userToFetch) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userToFetch);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userIdToUpdate = req.params.id;
    const {
      email,
      password,
      firstName,
      lastName,
      gender,
      image,
      phoneNumber,
      role,
    } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(userId);
    if (!user || user.role !== "SUPER_ADMIN") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if userIdToFetch is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userIdToFetch)) {
      return res.status(404).json({ message: "User not found" });
    }

    const userToUpdate = await userModel.findById(userIdToUpdate);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) userToUpdate.firstName = firstName;
    if (lastName) userToUpdate.lastName = lastName;
    if (gender) userToUpdate.gender = gender;
    if (email) userToUpdate.email = email;
    if (phoneNumber) userToUpdate.phoneNumber = phoneNumber;
    if (image) userToUpdate.image = image;
    if (role) userToUpdate.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      userToUpdate.password = hashedPassword;
    }

    await userToUpdate.save();

    res.status(200).json({
      email: userToUpdate.email,
      firstName: userToUpdate.firstName,
      lastName: userToUpdate.lastName,
      gender: userToUpdate.gender,
      image: userToUpdate.image,
      role: userToUpdate.role,
      phoneNumber: userToUpdate.phoneNumber,
      id: userToUpdate.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userIdToDelete = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(userId);
    if (!user || user.role !== "SUPER_ADMIN") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if userIdToFetch is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userIdToFetch)) {
      return res.status(404).json({ message: "User not found" });
    }

    const userToDelete = await userModel.findById(userIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    await userToDelete.remove();

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
