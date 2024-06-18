import styles from "./styles.module.css";
import { useLiveChat } from "../../hooks/useLiveChat";

export const LiveChat = () => {
  const {
    message,
    setMessage,
    onSubmit,
    rooms,
    currentRoom,
    setCurrentRoom,
    chat,
  } = useLiveChat();

  const headerTabs = rooms.map(({ id, parties }: any, key: any) => (
    <button
      id={id}
      onClick={(e: any) =>
        setCurrentRoom(
          rooms[
            rooms.findIndex(
              (room: any) => String(room.id) === String(e.target.id)
            )
          ]
        )
      }
      className={`${currentRoom?.id === id ? styles.active : ""}`}
      key={key}
    >
      {parties[0].partyAlias}
    </button>
  ));
  const bodyChat = (
    <ul className={styles.messages}>
      {chat.map(({ message, by }: any, key: any) => (
        <li className={`${by === "self" ? styles.right : ""}`} key={key}>
          {message}
        </li>
      ))}
    </ul>
  );
  const tempMessage = (
    <article>
      <p>Aqui ira el chat en vivo</p>
      <span>
        🚧
        <mark>
          Nota: Esta sección está actualmente en desarrollo y construcción.
        </mark>
        🚧
      </span>
      <p>
        Podras comunicarte conmigo directamente cuando me encuentre conectado,
        en caso contrario, te mostrara una opcion para redirigirte al formulario
        de contacto ubicado en el footer de la aplicacion.
      </p>
    </article>
  );
  return (
    <div className={styles.chat}>
      <div className={styles.header}>{headerTabs}</div>
      <div className={styles.body}>{bodyChat}</div>
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
