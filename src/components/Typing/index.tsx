import styles from "./styles.module.css";

export const Typing = (text: string = "") => {
  return (
    <div className={styles.typing_container}>
      <div className={styles.typing_text}>
        <span></span>
      </div>
      {text}
    </div>
  );
};
