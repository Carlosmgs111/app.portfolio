import styles from "./styles.module.css";
import { COA } from "../../components/COA";

export function Home({}: any) {
  return (
    <div className={styles.page}>
      <COA/>
    </div>
  );
}
