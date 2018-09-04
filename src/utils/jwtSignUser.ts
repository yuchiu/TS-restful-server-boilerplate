import * as jwt from "jsonwebtoken";
import { Document } from "mongoose";

export const jwtSignUser = (user: Document) => {
  try {
    const userJson: object = user.toJSON();
    const ONE_WEEK: number = 60 * 60 * 24 * 7;
    return jwt.sign(userJson, process.env.JWT_SECRET, {
      expiresIn: ONE_WEEK
    });
  } catch (err) {
    console.log(err);
  }
};
export const calling = () => {
  console.log("calling");
};
