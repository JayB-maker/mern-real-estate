import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/ConnectDB.js";
import authRoute from "./routes/AuthRoute.js";
import userRoute from "./routes/UserRoute.js";
import postRoute from "./routes/PostRoute.js";
import enumRoute from "./routes/EnumRoute.js";
import { uploadImage, uploadImages } from "./controllers/FileUploadController.js";

dotenv.config();

const PORT = process.env.PORT || "9000";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from Jayb");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/enums", enumRoute);
app.post("/api/v1/upload-files", uploadImages);
app.post("/api/v1/upload-file", uploadImage);

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
