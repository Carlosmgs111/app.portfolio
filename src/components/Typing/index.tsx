import styles from "./styles.module.css";

export const Typing = ({ text = "", fontSize = "3.8rem" }: any) => {
  return (
    <div style={{ fontSize }} className={styles.typing_container}>
      <div className={styles.typing_text}>
        <span></span>
      </div>
      {text}
    </div>
  );
};
