
import styles from "./styles.module.css";
import { getContextValue, CONTEXTS } from "../../contexts";

export function Banner({
  children,
  config = {},
  background,
  searchedUsername,
  customeMessage = true,
}) {
  const { username } = getContextValue(CONTEXTS.Global);
  return (
    <div className={styles.body} style={{ background }}>
      <h1 className={styles.title}>
        {customeMessage && username && "Tus "}
        {children}
        {customeMessage &&
          !username &&
          ` de ${searchedUsername ? searchedUsername : "la comunidad"}`}
      </h1>
    </div>
  );
}
