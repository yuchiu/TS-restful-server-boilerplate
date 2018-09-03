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

  public async getPost(req: Request, res: Response): Promise<void> {
    try {
      const slug: string = req.params.slug;
      const data = await PostModel.findOne({ slug });
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

  public async createPost(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    try {
      const { title, content, featuredImage, slug } = req.body;
      const postModel = new PostModel({
        title,
        content,
        featuredImage,
        slug
      });

      const data = await postModel.save();
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

  public async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const slug: string = req.params.slug;
      const data = await PostModel.findOneAndRemove({ slug });
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
  public async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const slug: string = req.params.slug;
      const data = await PostModel.findOneAndUpdate({ slug }, req.body);
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
    this.router.post("/", this.createPost);
    this.router.get("/", this.getPosts);
    this.router.get("/:slug", this.getPost);
    this.router.put("/:slug", this.updatePost);
    this.router.delete("/:slug", this.deletePost);
  }
}

const postController = new PostController();
postController.routes();

export default postController.router;
