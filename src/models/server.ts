import express, { Application } from "express";
import cors from "cors";
import path from "path";
import { createServer, Server as ServerHttp } from "http";

import { Server as ServerIo } from "socket.io";
import Sockets from "./sockets";

class Server {
  private app: Application;
  private port: number | string;
  private server: ServerHttp;
  private io: ServerIo;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3333;

    // HTTP SERVER
    this.server = createServer(this.app);

    // CONFIG SOCKETS
    this.io = new ServerIo(this.server);
  }

  middlewares() {
    this.app.use(cors());
    // Deploy directory public
    this.app.use(express.static(path.join(__dirname, "..", "..", "public")));
  }

  socketsConfigurations() {
    new Sockets(this.io);
  }

  execute() {
    // init middlewares
    this.middlewares();

    // init socket
    this.socketsConfigurations();

    this.server.listen(this.port, () => {
      console.log("Is running");
    });
  }
}

export default Server;
