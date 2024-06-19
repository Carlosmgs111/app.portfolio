import styles from "./styles.module.css";

export const TypingLoader = ({ color = "black" }) => {
  return (
    <div className={styles["typing-indicator"]}>
      <span style={{ backgroundColor: color }}></span>
      <span style={{ backgroundColor: color }}></span>
      <span style={{ backgroundColor: color }}></span>
    </div>
  );
};
