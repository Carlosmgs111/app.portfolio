import styles from "./styles.module.css";
import hero from "../../mocks/hero.json";

const Card = ({ faIcon, title, summary }: any) => (
  <article>
    <span>
      <i className={faIcon}></i>
      {title}
    </span>
    <span>{summary}</span>
  </article>
);
export function Home({}: any) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        {hero.map(({ faIcon, title, summary }: any) => (
          <Card faIcon={faIcon} title={title} summary={summary} />
        ))}
      </section>
    </div>
  );
}
