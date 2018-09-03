import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../models/";

class UserController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
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
      const { name, username, email, password, featuredImage } = req.body;
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

  routes() {
    this.router.post("/", this.createUser);
    this.router.get("/", this.getUsers);
    this.router.get("/:username", this.getUser);
    this.router.put("/:username", this.updateUser);
    this.router.delete("/:username", this.deleteUser);
  }
}

const userController = new UserController();
userController.routes();

export default userController.router;
