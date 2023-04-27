// importar la biblioteca socket.io-client
const io = require("socket.io-client");

// crear una instancia del cliente SocketIO
const socket = io("http://127.0.0.1:8765");

const readline = require("readline");

// escuchar el evento 'connect' para saber cuándo se ha establecido la conexión con el servidor
socket.on("connect", () => {
  console.log("Conexión establecida con el servidor.");
});

// escuchar el evento 'disconnect' para saber cuándo se ha perdido la conexión con el servidor
socket.on("disconnect", () => {
  console.log("Conexión perdida con el servidor.");
});

// escuchar el evento 'message' para recibir mensajes del servidor
socket.on("message", (message) => {
  console.log(`Mensaje recibido del servidor: ${message.payload}`);
});

socket.on("connect_error", (error) => {
  console.error("Error de conexión:", error);
});

socket.on("jsResponse", (message) => {
  const { payload, error } = message;
  console.log({ payload, error });
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar() {
  rl.question("Ingresa un texto: \n", (texto) => {
    socket.emit("process_message", { response: "jsResponse", payload: texto });
    preguntar(); // Volvemos a llamar a la función para seguir preguntando
  });
}

preguntar();
