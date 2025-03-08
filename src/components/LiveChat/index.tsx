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
    counterpartyIsTyping,
  } = useLiveChat();

  console.log({ rooms, chats, currentRoom, counterpartyIsTyping });

  const helperMessage = "Hola 👋, como te llamas?";

  const headerTabs =
    token &&
    rooms.map((roomId: any, key: any) => (
      <button
        id={roomId}
        onClick={(e: any) =>
          setCurrentRoom(
           roomId
          )
        }
        className={`${currentRoom === roomId ? styles.active : ""}`}
        key={key}
      >
        {roomId}
      </button>
    ));

  const bodyChat = (
    <ul className={styles.messages}>
      {!alias && (
        <span>
          Hola 👋, primera vez? Sólo dime quién eres para empezar a chatear 💬
          en vivo conmigo. Puede hacerlo ingresando tu nombre o a quién
          representa en el formulario en la parte inferior ⬇️ y presionando
          'enter' o haciendo clic en el botón{" "}
          <i className="fa-solid fa-paper-plane"></i>.
        </span>
      )}
      {chats[currentRoom]?.map(({ message, by }: any, key: any) => (
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
      {counterpartyIsTyping && (
        <li>
          <div
            style={{
              margin: "0.2rem 0",
              padding: "0.4rem",
            }}
          >
            <TypingLoader></TypingLoader>
          </div>
        </li>
      )}
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
      <div className={styles.body}>
        {rooms[0] && bodyChat}
        {!token && !rooms[0] && offlineMessage}
        {token && !rooms[0] && noClients}
      </div>
      <div className={styles.header}>{headerTabs}</div>
      {rooms.length > 0 && (
        <form className={styles.dashboard} onSubmit={onSubmit}>
          <input
            type="text"
            id="chat"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            placeholder={!alias && !token ? helperMessage : ""}
          ></input>
          <button className="fa-solid fa-paper-plane" type="submit"></button>
          {!alias && !token && (
            <span style={{ opacity: Number(!Boolean(message)) }}>
              {helperMessage}
            </span>
          )}
        </form>
      )}
    </div>
  );
};
