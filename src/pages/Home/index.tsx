import styles from "./styles.module.css";
import { ReactNodeTest } from "../../components/ReactNodeTest";

export function Home({}: any) {
  return (
    <div className={styles.page}>
      <div className={styles.over}>
        <ReactNodeTest className={styles.blueprint}></ReactNodeTest>
      </div>
    </div>
  );
}
