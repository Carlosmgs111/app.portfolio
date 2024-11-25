import styles from "./styles.module.css";
import { useStateValue } from "../../context";

export function Banner({
  children,
  background,
  searchedUsername,
  customeMessage = false,
  ownish = false,
}: any) {
  const [{ username }]: any = useStateValue();
  return (
    <div className={styles.body} style={{ background }}>
      <h1 className={styles.title}>
        {customeMessage && username && ownish && "Tus "}
        {children}
        {customeMessage &&
          !username &&
          ` de ${searchedUsername ? searchedUsername : "la comunidad"}`}
      </h1>
    </div>
  );
}
