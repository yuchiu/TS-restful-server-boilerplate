import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as helmet from "helmet";
import * as compression from "compression";
import * as cors from "cors";

import { userRouter } from "./routers";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    //mongoose
    mongoose.connect(
      process.env.MONGO_LOCAL_URI || process.env.MONGO_CLOUD_URI
    ),
      { useNewUrlParser: true },
      err => {
        if (err) {
          console.log(`DB Connection failed:${err}`);
        } else {
          console.log("DB Connection Success");
        }
      };

    //config
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(logger("dev"));
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use("/", router);
    this.app.use("/api/v1/users", userRouter);
  }
}

export default new Server().app;
