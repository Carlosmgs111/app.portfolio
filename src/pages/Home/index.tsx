import styles from "./styles.module.css";
import hero from "../../mocks/hero.json";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home &bull; Carlos Muñoz Gachancipá</title>
      </Helmet>
      <section className={styles.quality_attributes}>
        {hero.map(({ faIcon, title, summary }: any, key: any) => (
          <Card key={key} faIcon={faIcon} title={title} summary={summary} />
        ))}
      </section>
    </div>
  );
}
