import { Router, Request, Response, NextFunction } from "express";
import { PostModel } from "../models/";

class PostController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const data = await PostModel.find({});
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

  public getPost(req: Request, res: Response): void {}

  public createPost(req: Request, res: Response): void {}

  public deletePost(req: Request, res: Response): void {}
  public updatePost(req: Request, res: Response): void {}

  routes() {
    this.router.get("/", this.getPosts);
  }
}

const postController = new PostController();
postController.routes();

export default postController.router;
