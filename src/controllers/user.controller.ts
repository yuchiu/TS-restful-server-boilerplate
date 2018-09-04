import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/";

class UserController {
  constructor() {}
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
    console.log(req.body);
    try {
      const name: string = req.body.name;
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const featuredImage: string = req.body.featuredImage;

      const userModel = new UserModel({
        name,
        username,
        email,
        password,
        featuredImage
      });

      const data = await userModel.save();
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
