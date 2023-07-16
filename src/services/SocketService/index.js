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
    const [client, sendTo, params, receiverFunctionName] =
      this.extractRemoteHandlersSpecs(payload, receiverFunc);
    if (Mapfy(this.clients).size && this.clients[client]) {
      this.clients[client].emit(sendTo, { [receiverFunctionName]: params });
      if (receiverFunc) {
        return this.receiveMessage(receiverFunc, client);
      }
    }
    return this;
  };

  receiveMessage = (payload, client) => {
    let [functionName, cb] = this.extractFunctionSpecs(payload);
    return new Promise((resolve, reject) => {
      this.clients[client].on(functionName, (data) => {
        resolve(cb(data));
      });
    });
  };

  extractRemoteHandlersSpecs = (object, receiverFunc) => {
    let specs = [];
    const [client, _payload] = Mapfy(object).entries().next().value;
    const [sendTo, params] = Mapfy(_payload).entries().next().value;
    specs = [client, sendTo, params];
    if (receiverFunc)
      specs = [...specs, this.extractFunctionSpecs(receiverFunc)[0]];
    return specs;
  };

  extractFunctionSpecs = (object) => {
    let [functionName, cb] = ["function_not_provided", (...[]) => {}];
    if (object instanceof Function) {
      [functionName, cb] = [object.name, object];
    } else if (cb instanceof Object) {
      [functionName, cb] = Mapfy(object).entries().next().value;
    }
    return [functionName, cb];
  };
}
