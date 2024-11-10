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
        {/* <video autoPlay muted loop playsInline>
          <source
            src={
              "https://github.com/user-attachments/assets/a4adcad9-67cb-4573-9b72-253f2dac23b4"
            }
            type="video/mp4"
          />
        </video> */}
      </section>
      <section className={styles.quality_attributes}>
        {hero.map(({ faIcon, title, summary }: any) => (
          <Card faIcon={faIcon} title={title} summary={summary} />
        ))}
      </section>
    </div>
  );
}
