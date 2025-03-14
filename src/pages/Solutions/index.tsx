import { Page } from "../../components/Page";
import { Refs } from "../../components/Refs";
import { useStateValue } from "../../context";
import solutions from "../../mocks/solutions.json";
import styles from "./styles.module.css";

const CardSolution = ({ faIcon, title, summary, className = "" }: any) => {
  return (
    <a href="/" className={`${styles.card} ${className}`}>
      <span>
        <i className={faIcon}></i>
        {title}
      </span>
      <span>{summary}</span>
    </a>
  );
};

export const Solutions = () => {
  const [{ language }] = useStateValue();
  return (
    <Page>
      <section className={styles.quality_attributes}>
        <Refs>
          {solutions.map(({ faIcon, title, summary }: any, key: any) => (
            <CardSolution
              id={key}
              key={key}
              faIcon={faIcon}
              title={title[language]}
              summary={summary[language]}
              $useCurrent={(current: any) => {
                const observer: any = new window.IntersectionObserver(
                  (entries) => {
                    const { isIntersecting }: any = entries[0];
                    if (current.classList.contains(styles.visible)) return;
                    if (isIntersecting) current.classList.add(styles.visible);
                  },
                  { threshold: 0.5 }
                ).observe(current);
                return () => {
                  observer?.disconnect();
                };
              }}
            />
          ))}
        </Refs>
      </section>
    </Page>
  );
};
