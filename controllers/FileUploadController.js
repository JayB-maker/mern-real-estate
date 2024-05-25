import { upload, uploadMultiple } from "../middleware/Multer.js";
import cloudinary from "../utils/Cloudinary.js";
import fs from "fs";

export const uploadImages = (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading files" });
    }
    try {
      const promises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        // Delete the file from the local storage after upload
        fs.unlinkSync(file.path);
        return result.secure_url;
      });
      const uploadedImages = await Promise.all(promises);
      res.status(200).json({ imageUrls: uploadedImages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error uploading files to Cloudinary" });
    }
  });
};

export const uploadImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading file" });
    }
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      // Delete the file from the local storage after upload
      fs.unlinkSync(req.file.path);
      res.status(200).json({ imageUrls: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error uploading files to Cloudinary" });
    }
  });
};
