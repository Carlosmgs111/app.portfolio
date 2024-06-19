import styles from "./styles.module.css";
import { useLiveChat } from "../../hooks/useLiveChat";
import { ContactForm } from "../../components/ContactForm";
import { TypingLoader } from "../../components/TypingLoader";

export const LiveChat = () => {
  const {
    message,
    setMessage,
    onSubmit,
    rooms,
    currentRoom,
    setCurrentRoom,
    chats,
    token,
    alias,
  } = useLiveChat();

  const headerTabs =
    token &&
    rooms.map(({ id, parties }: any, key: any) => (
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
      {!alias && (
        <span>
          Hola 👋, primera vez? Sólo dime quién eres para empezar a chatear 💬
          en vivo conmigo. Puede hacerlo ingresando su nombre o a quién
          representa en el formulario en la parte inferior ⬇️ y presionando
          'enter' o haciendo clic en el botón{" "}
          <i className="fa-solid fa-paper-plane"></i>.
        </span>
      )}
      <li>
        <p><TypingLoader></TypingLoader></p>
      </li>
      {chats[currentRoom?.id]?.map(({ message, by }: any, key: any) => (
        <li
          className={`
          ${by === "self" ? styles.right : ""} ${
            by === "advice" ? styles.advice : ""
          }`}
          key={key}
        >
          <p>{message}</p>
        </li>
      ))}
    </ul>
  );
  const offlineMessage = (
    <article>
      <h3>Lo siento 😥, actualmente no me encuentro conectado.</h3>
      <span>
        <mark>
          Sin embargo puedes enviarme un correo electronico 📧 para contactarme
          con el siguiente formulario ⬇️.
        </mark>
      </span>
      <ContactForm></ContactForm>
    </article>
  );
  const noClients = (
    <div>
      <span>
        <mark>No hay clientes conectados... 🥲</mark>
      </span>
    </div>
  );
  return (
    <div className={styles.chat}>
      <div className={styles.header}>{headerTabs}</div>
      <div className={styles.body}>
        {rooms[0] && bodyChat}
        {!token && !rooms[0] && offlineMessage}
        {token && !rooms[0] && noClients}
      </div>
      {rooms.length > 0 && (
        <form className={styles.dashboard} onSubmit={onSubmit}>
          <input
            type="text"
            id="chat"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            placeholder="Para iniciar indícame quien eres..."
          ></input>
          <button className="fa-solid fa-paper-plane" type="submit"></button>
          {!alias && !token && (
            <span style={{ opacity: Number(!Boolean(message)) }}>
              {"Para iniciar indícame quien eres..."}
            </span>
          )}
        </form>
      )}
    </div>
  );
};
