import mongoose from "mongoose";

const connectDB = (URI) => {
  mongoose.set("strictQuery", true);
  // mongoose.set("strictPopulate", false);
  mongoose
    .connect(URI)
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log(error));
};


export default connectDB;