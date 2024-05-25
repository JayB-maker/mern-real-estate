import express from "express";
import {
  getGenderTypeEnum,
  getPropertyTypes,
  getRoleTypeEnum,
} from "../controllers/EnumController.js";

const enumRoute = express.Router();

enumRoute.get("/gender", getGenderTypeEnum);
enumRoute.get("/role", getRoleTypeEnum);
enumRoute.get("/property-type", getPropertyTypes);

export default enumRoute;
