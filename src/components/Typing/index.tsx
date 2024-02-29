import styles from "./styles.module.css";

export const Typing = ({
  cursor = true,
  text = "",
  fontSize = "3.8rem",
  fontWeight = 500,
}: any) => {
  return (
    <div style={{ fontSize , fontWeight}} className={styles.typing_container}>
      <div
        className={styles.typing_text.concat(" ", cursor ? styles.cursor : "")}
      >
        <span></span>
      </div>
      {text}
    </div>
  );
};
