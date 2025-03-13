import styles from "./styles.module.css";
import hero from "../../mocks/hero.json";
import { Helmet } from "react-helmet";
import { Refs } from "../../components/Refs";
import { useStateValue } from "../../context";

const Card = ({ faIcon, title, summary, className = "" }: any) => (
  <article className={`${styles.card} ${className}`}>
    <span>
      <i className={faIcon}></i>
      {title}
    </span>
    <span>{summary}</span>
  </article>
);
export function Home({}: any) {
  const [{ language }] = useStateValue();
  return (
    <div className={styles.page}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home &bull; Carlos Muñoz Gachancipá</title>
      </Helmet>
      <section className={styles.quality_attributes}>
        <Refs>
          {hero.map(({ faIcon, title, summary }: any, key: any) => (
            <Card
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
    </div>
  );
}
