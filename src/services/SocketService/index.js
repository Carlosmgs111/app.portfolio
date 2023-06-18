const { Server } = require("socket.io");
const { Mapfy, UnMapfy } = require("../../utils");

module.exports = class SocketService {
  server = new Server(8765, {
    cors: {
      origin: "*",
    },
  });
  sockets = {};
  events = [];

  constructor() {
    this.server.on("connection", (socket) => {
      console.log(`${socket.id} Connected!`.green);
      this.sockets[socket.id] = socket;
      this.setEvents(socket);

      socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected!`.red);
        const newSockets = Mapfy(this.sockets);
        newSockets.delete(socket.id);
        this.sockets = UnMapfy(newSockets);
      });
    });
  }

  addEvent = (event) => this.events.push(event);

  setEvents = (socket) => {
    this.events.forEach((event) => {
      const [name, cb] = Mapfy(event).entries().next().value;
      socket.addListener(name, (data) => {
        cb(data, (_result) => {
          const [response, result] = Mapfy(_result).entries().next().value;
          socket.emit(response, result);
        });
      });
    });
  };
};
