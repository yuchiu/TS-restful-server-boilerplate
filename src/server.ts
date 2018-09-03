import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as compression from "compression";
import * as cors from "cors";

//import routers

//Server class
class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    //mongoose
    mongoose.connect(process.env.MONGO_CLOUD_URI);

    //config
    const corsOptions = {
      origin: "http://localhost:5050",
      optionsSuccessStatus: 200
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(logger("dev"));
  }

  public routes(): void {
    let router: express.Router;
    router = express.Router();
    this.app.use("/", router);
    // this.app.use('/api/v1/posts',controller)
  }
}

export default new Server().app;
