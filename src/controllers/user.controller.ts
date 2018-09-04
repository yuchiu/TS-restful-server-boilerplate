import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/";
import * as bcrypt from "bcryptjs";
import { jwtSignUser } from "../utils/jwtSignUser";
import { Document } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
  name?: string;
  email?: string;
  featuredImage?: string;
}
class UserController {
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const userList = await UserModel.find({});
      res.status(200).send({
        userList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: `server error`
      });
    }
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.params.username;
      const user = await UserModel.findOne({ username });
      res.status(200).send({
        user
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: `server error`
      });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const credentials: User = req.body;

      const isUsernameRegistered = await UserModel.findOne({
        username: credentials.username
      });

      /* username already registered */
      if (isUsernameRegistered) {
        res.status(403).send({
          confirmation: false,
          error: `username: ${credentials.username} is already registered`
        });
      }

      const isEmailRegistered = await UserModel.findOne({
        email: credentials.email
      });

      /* email already registered */
      if (isEmailRegistered) {
        res.status(403).send({
          confirmation: false,
          error: `email: ${credentials.email} is already registered`
        });
      }

      /* credential is validated */
      credentials.password = await bcrypt.hash(credentials.password, 10);
      const user = await UserModel.create(credentials);
      const token = jwtSignUser(user);
      res.status(200).send({
        user,
        token
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: `server error`
      });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const credentials: User = req.body;

      const user = await UserModel.findOne({ username: credentials.username });

      /* user not registered */
      if (!user) {
        res.status(403).send({
          error: `this account ${credentials.username} is not yet registered`
        });
      }

      /* validate password */
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.toJSON().password
      );

      /* invalid password */
      if (!isPasswordValid) {
        res.status(403).send({
          error: `invalid password`
        });
      }

      /* password is validated */
      res.status(200).send({
        user
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: `server error`
      });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.params.username;
      const user = await UserModel.findOneAndRemove({ username });
      res.status(200).send({
        user
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: `server error`
      });
    }
  }
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.params.username;
      const user = await UserModel.findOneAndUpdate({ username }, req.body);
      res.status(200).send({
        user
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: `server error`
      });
    }
  }
}

export default new UserController();
