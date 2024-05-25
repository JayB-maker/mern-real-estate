import multer from "multer";

const storage = multer.diskStorage({});

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
}).single("image"); // 'image' is the field name in the form data for uploading the image

export const uploadMultiple = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit per file
}).array("images", 10); // 'images' is the field name in the form data for uploading multiple images, and 5 is the maximum number of files allowed
