import { useNearScreen } from "../../hooks/useNearScreen";
import content from "../../mocks/content.json";
import styles from "./styles.module.css";
import { useStateValue } from "../../context";
import { useToggle } from "../../hooks/useToggle";
import { Typing } from "../../components/Typing";

export const About = ({}: any) => {
  const [{ language }]: any = useStateValue();
  const { summary }: any = content;
  const [summaryRef, showSummary] = useNearScreen(false, null, {
    threshold: 0.05,
  });
  const wordsInCode = [
    {
      content: "Backend",
      color: "#339933",
    },
    {
      content: "Frontend",
      color: "#61dafb",
    },
    {
      content: "Fullstack",
      color: "#e0234e",
    },
    {
      content: "Python",
      color: "#3776ab",
    },
    {
      content: "Javascript",
      color: "#f7df1e",
    },
    {
      content: "Typescript",
      color: "#3178c6",
    },
  ];
  const [showCoding, toggleShowCoding] = useToggle(false, true);
  const [codingRef] = useNearScreen(
    false,
    (_: any, show: any) => show && !showCoding && toggleShowCoding(),
    {
      threshold: 0.05,
    }
  );
  return (
    <div className={styles.page}>
      <article
        ref={summaryRef}
        className={`${styles.section} ${showSummary && styles.visible}`}
      >
        <p className={styles.text}>{summary[language]}</p>
      </article>
      <section
        ref={codingRef}
        className={`${styles.section} ${showCoding ? styles.visible : ""} ${
          styles.coding_section
        }`}
      >
        <div className={styles.console}>
          <span>{" > "}</span>
          <div className={styles.output}>
            <span>Hi! I'm Carlos Muñoz</span>
            <Typing
              words={wordsInCode}
              text={"Developer"}
              cursor={false}
              fontSize={"1.6rem"}
            />
            <span>and make solutions with tech is my passion</span>
            <br />
            <span>💪💖🦄</span>
          </div>
        </div>
      </section>
    </div>
  );
};
