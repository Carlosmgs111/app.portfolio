import styles from "./styles.module.css";

export const LiveChat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.body}>
        <article>Aqui ira el chat en vivo</article>{" "}
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
      <input className={styles.dashboard}></input>
    </div>
  );
};
