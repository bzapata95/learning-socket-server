import { Server } from "socket.io";

export default class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      socket.on("new-message", (data) => {
        console.log(data);

        this.io.emit("send-message-from-server", data);
      });
    });
  }
}
