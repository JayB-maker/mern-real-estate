import jwt from "jsonwebtoken";
import { userModel } from "../models/UserModel.js";

export const Protected = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Unauthorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token" });
  }
};
