import { Router } from "express";

import { postController } from "../controllers";

class PostRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post("/", postController.createPost);
    this.router.get("/", postController.getPosts);
    this.router.get("/:slug", postController.getPost);
    this.router.put("/:slug", postController.updatePost);
    this.router.delete("/:slug", postController.deletePost);
  }
}

const postRouter = new PostRouter();
postRouter.routes();

export default postRouter.router;
