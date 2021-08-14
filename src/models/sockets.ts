import { Server } from "socket.io";
import BandList, { IBand } from "./band-list";

export default class Sockets {
  private io: Server;
  private bandList: BandList;

  constructor(io: Server) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      // Emit to connected client, all actuality bands
      socket.emit("current-bands", this.bandList.getBands());

      socket.on("vote-band", (data) => {
        this.bandList.increaseVotes(data.id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("delete-band", ({ id }) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("change-name-band", ({ id, name }) => {
        this.bandList.changeBandName(id, name);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("new-band", ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}
