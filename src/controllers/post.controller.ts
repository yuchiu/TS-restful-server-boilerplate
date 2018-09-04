import { Request, Response, NextFunction } from "express";

import { PostModel } from "../models/";

class PostController {
  constructor() {}
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
    try {
      const title: string = req.body.title;
      const content: string = req.body.content;
      const slug: string = req.body.featuredImage;
      const featuredImage: string = req.body.featuredImage;

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
}

export default new PostController();
