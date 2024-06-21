import { useNearScreen } from "../../hooks/useNearScreen";
import content from "../../db/content.json";
import styles from "./styles.module.css";
import { useStateValue } from "../../contexts/context";

export const About = ({}: any) => {
  const [{ currentLang }] = useStateValue();
  const { summary }: any = content;
  const [summaryRef, showSummary] = useNearScreen(false, null, {
    threshold: 0.05,
  });
  return (
    <div className={styles.page}>
      <article
        ref={summaryRef}
        className={`${styles.section} ${showSummary && styles.visible}`}
      >
        <p className={styles.text}>{summary[currentLang]}</p>
      </article>
    </div>
  );
};
