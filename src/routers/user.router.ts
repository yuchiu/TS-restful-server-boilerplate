import { Router } from "express";

import { userController } from "../controllers";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", userController.getUsers);
    this.router.get("/:username", userController.getUser);
    this.router.post("/", userController.createUser);
    this.router.post("/:username", userController.loginUser);
    this.router.put("/:username", userController.updateUser);
    this.router.delete("/:username", userController.deleteUser);
  }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;
