import { connect } from "socket.io-client";
import { Mapfy } from "../../utils";

export class SocketService {
  clients = {};

  constructor(clients = []) {
    if (clients) {
      for (let client of clients) {
        this.addClient(client);
      }
    }
    return this;
  }

  addClient = (client) => {
    const [alias, address] = Mapfy(client).entries().next().value;
    this.clients[alias] = connect(address);
    this.clients[alias].on("connect", () => {
      console.log("Conexión establecida con el servidor.");
    });
    this.clients[alias].on("disconnect", () => {
      console.log("Conexión perdida con el servidor.");
    });
    this.clients[alias].on("message", (message) => {
      console.log(`Mensaje recibido del servidor: ${message.payload}`);
    });
    this.clients[alias].on("connect_error", (error) => {
      console.error("Error de conexión:", error);
    });
    return this;
  };

  sendMessage = (payload, receiverFunc) => {
    return new Promise((resolve, reject) => {
      const [client, _params] = Mapfy(payload).entries().next().value;
      if (Mapfy(this.clients).size && this.clients[client]) {
        const [sendTo, params] = Mapfy(_params).entries().next().value;
        let responseName = "receiver_function_not_provided";
        if (receiverFunc) {
          responseName = receiverFunc.name;
          this.clients[client].on(responseName, (data) => {
            console.log({ data });
            resolve(receiverFunc(data));
          });
        }
        this.clients[client].emit(sendTo, { [responseName]: params });
      }
    });
  };
}
