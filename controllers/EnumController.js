import {
  genderTypeEnum,
  propertyTypeEnum,
  roleTypeEnum,
} from "../utils/Enums.js";

export const getPropertyTypes = (req, res) => {
  const formattedEnum = {};
  for (const value of propertyTypeEnum) {
    formattedEnum[value] = value.toUpperCase();
  }
  res.json(formattedEnum);
};

export const getRoleTypeEnum = (req, res) => {
  const formattedEnum = {};
  for (const value of roleTypeEnum) {
    formattedEnum[value] = value.toUpperCase();
  }
  res.status(200).json(formattedEnum);
};

export const getGenderTypeEnum = (req, res) => {
  const formattedEnum = {};
  for (const value of genderTypeEnum) {
    formattedEnum[value] = value.toUpperCase();
  }
  res.status(200).json(formattedEnum);
};
