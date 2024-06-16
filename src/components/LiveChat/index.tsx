import styles from "./styles.module.css";
import { useStateValue } from "../../contexts/context";
import { SocketService } from "../../services";
import { useEffect, useState } from "react";
import { actionTypes } from "../..";

export const LiveChat = () => {
  const [{ token }, dispatch] = useStateValue();
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const kind = token ? "host" : "guest";

  const register = () => {
    SocketService.sendMessage({
      core: {
        register: [
          {
            id: SocketService.id,
            alias: SocketService.id,
            kind,
          },
        ],
      },
    });
    if (token) {
      SocketService.sendMessage({ core: { isOnline: [Boolean(token)] } });
    }
  };

  useEffect(() => {
    register();
    SocketService.onConnectionEvent = () => {
      register();
    };
  }, [token]);

  useEffect(() => {
    SocketService.receiveMessage({
      core: { message: async (_message: any) => console.log({ _message }) },
    });
    SocketService.receiveMessage({
      core: {
        response: ({ message, from, to }: any) => {
          console.log({ message, from, to });
        },
      },
    });
    SocketService.receiveMessage({
      core: {
        isOnline: ({ isOnline }: any) => {
          dispatch({ type: actionTypes.setIsOnline, payload: isOnline });
        },
      },
    });
    SocketService.receiveMessage({
      core: {
        rooms: (rooms: any) => {
          setRooms(rooms);
          console.log({ rooms });
        },
      },
    });
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    SocketService.sendMessage({
      core: {
        message: [
          {
            message,
            room: rooms[0],
          },
        ],
      },
    });
  };

  return (
    <div className={styles.chat}>
      <div className={styles.body}>
        <article>Aqui ira el chat en vivo</article>
        <span>
          🚧
          <mark>
            Nota: Esta sección está actualmente en desarrollo y construcción.
          </mark>
          🚧
        </span>
        <p>
          Podras comunicarte conmigo directamente cuando me encuentre conectado,
          en caso contrario, te mostrara una opcion para redirigirte al
          formulario de contacto ubicado en el footer de la aplicacion.
        </p>
      </div>
      <form className={styles.dashboard} onSubmit={onSubmit}>
        <input
          type="text"
          id="chat"
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
        ></input>
        <button className="fa-solid fa-paper-plane" type="submit"></button>
      </form>
    </div>
  );
};
