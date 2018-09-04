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
      const data = await UserModel.find({});
      const status = res.statusCode;
      res.send({
        status,
        data
      });
    } catch (err) {
      const status = res.statusCode;
      res.send({
        status,
        err
      });
    }
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.params.username;
      const data = await UserModel.findOne({ username });
      const status = res.statusCode;
      res.send({
        status,
        data
      });
    } catch (err) {
      const status = res.statusCode;
      res.send({
        status,
        err
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
          err: `username: ${credentials.username} is already registered`
        });
      }

      const isEmailRegistered = await UserModel.findOne({
        email: credentials.email
      });

      /* email already registered */
      if (isEmailRegistered) {
        res.status(403).send({
          confirmation: false,
          err: `email: ${credentials.email} is already registered`
        });
      }

      /* hash password */
      credentials.password = await bcrypt.hash(credentials.password, 10);

      const user = await UserModel.create(credentials);
      const status = res.statusCode;
      const token = jwtSignUser(user);
      res.send({
        status,
        user,
        token
      });
    } catch (err) {
      const status = res.statusCode;
      res.send({
        status,
        err
      });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const credentials: User = req.body;
      const status = res.statusCode;

      const user = await UserModel.findOne({ username: credentials.username });

      /* user not registered */
      if (!user) {
        res.send({
          status,
          err: `this account ${credentials.username} is not yet registered`
        });
      }

      /* validate password */
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.toJSON().password
      );

      /* invalid password */
      if (!isPasswordValid) {
        res.send({
          status,
          err: `invalid password`
        });
      }

      /* password is validated */
      res.send({
        status,
        user
      });
    } catch (err) {
      const status = res.statusCode;
      res.send({
        status,
        err
      });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.params.username;
      const data = await UserModel.findOneAndRemove({ username });
      const status = res.statusCode;
      res.send({
        status,
        data
      });
    } catch (err) {
      const status = res.statusCode;
      res.send({
        status,
        err
      });
    }
  }
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.params.username;
      const data = await UserModel.findOneAndUpdate({ username }, req.body);
      const status = res.statusCode;
      res.send({
        status,
        data
      });
    } catch (err) {
      const status = res.statusCode;
      res.send({
        status,
        err
      });
    }
  }
}

export default new UserController();
