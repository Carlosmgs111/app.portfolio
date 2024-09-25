import { useNearScreen } from "../../hooks/useNearScreen";
import content from "../../db/content.json";
import styles from "./styles.module.css";
import { useStateValue } from "../../contexts/context";
import { useToggle } from "../../hooks/useToggle";
import { CodeSnap } from "../../components/CodeSnap";
import { Typing } from "../../components/Typing";

export const About = ({}: any) => {
  const [{ currentLang }] = useStateValue();
  const { summary }: any = content;
  const [summaryRef, showSummary] = useNearScreen(false, null, {
    threshold: 0.05,
  });
  const literalCodeSnapshot = `
    1 | class Developer {
    2 |   name: string = "";
    3 |   lastName: string = "";
    4 |
    5 |   constructor(name: string, lastName: string) {
    6 |     this.name = name;
    7 |     this.lastName = lastName;
    8 |   };
    9 |
    10|   introducesYourSelf(): string {
    11|     return \`
    12|     Hi! I'm \${this.name} \${this.lastName}
    13|     <{*Typing*}>
    14|     and make solutions is my passion
    15|     💪💖🦄
    15|     \`;
    16|   };
    17| };
    18|
    19| const Carlos = new Developer("Carlos", "Muñoz");
    20| console.log(Carlos.introducesYourSelf())
    `;
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
      <div className={styles.page_background}></div>
      <article
        ref={summaryRef}
        className={`${styles.section} ${showSummary && styles.visible}`}
      >
        <p className={styles.text}>{summary[currentLang]}</p>
      </article>

      <section
        ref={codingRef}
        className={`${styles.section} ${showCoding ? styles.visible : ""} ${
          styles.coding_section
        }`}
      >
        <CodeSnap fontSize={"1.6rem"} words={wordsInCode}>
          {literalCodeSnapshot.replaceAll("|", " ")}
        </CodeSnap>
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
