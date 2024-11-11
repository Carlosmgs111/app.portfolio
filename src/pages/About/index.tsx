import { useNearScreen } from "../../hooks/useNearScreen";
import content from "../../mocks/content.json";
import styles from "./styles.module.css";
import { useStateValue } from "../../contexts/context";
import { useToggle } from "../../hooks/useToggle";
import { Typing } from "../../components/Typing";

export const About = ({}: any) => {
  const [{ currentLang }] = useStateValue();
  const { summary }: any = content;
  const [showIntroduccion, toggleShowIntroduccion] = useToggle(false, true);
  const [summaryRef, showSummary] = useNearScreen(false, null, {
    threshold: 0.05,
  });

  const mySkills = [
    { content: "React", color: "#61DAFB" },
    { content: "NextJS", color: "#fff" },
    ,
    {
      content: "Node",
      color: "#339933",
    },
    { content: "HTML5", color: "#E34F26" },
    {
      content: "Python",
      color: "#3776ab",
    },
    { content: "PostgreSQL", color: "#4169E1" },
    { content: "SocketIO", color: "#eceaea" },
    { content: "CSS3", color: "#1572B6" },
    {
      content: "Javascript",
      color: "#f7df1e",
    },
    { content: "MongoDB", color: "#47A248" },
    { content: "Express", color: "#fff" },
    {
      content: "Typescript",
      color: "#3178c6",
    },
  ];
  const myStacks = [
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
  ];
  const introduction: any = {
    es: (
      <div className={styles.introduction}>
        <h1>
          Hola, soy <br />
          <b>Carlos Muñoz</b>,
        </h1>
        <h2>
          Desarrollador
          <Typing
            baseTiming={4.8}
            words={myStacks}
            fontSize={"3.2rem"}
          ></Typing>
        </h2>
        <br />
        <h2>Creo Soluciones </h2>
        <br />
        <h2>
          Usando
          <Typing
            baseTiming={2.8}
            words={mySkills}
            fontSize={"3.2rem"}
          ></Typing>
        </h2>
      </div>
    ),
    en: (
      <div className={styles.introduction}>
        <h1>
          Hi, i'm <br />
          <b>Carlos Muñoz</b>,
        </h1>
        <h2>
          <Typing
            baseTiming={4.8}
            words={myStacks}
            fontSize={"3.2rem"}
            text={["Developer"]}
          ></Typing>
        </h2>
        <br />
        <h2>I make solutions </h2>
        <br />
        <h2>
          Using
          <Typing
            baseTiming={2.8}
            words={mySkills}
            fontSize={"3.2rem"}
          ></Typing>
        </h2>
      </div>
    ),
  };
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
  const [introductionRef] = useNearScreen(
    false,
    (_: any, show: any) => show && !showIntroduccion && toggleShowIntroduccion()
  );
  console.log({showIntroduccion})
  return (
    <div className={styles.page}>
      <article ref={introductionRef} className={`${styles.section}`}>
        <div className={`${styles.hero} ${showIntroduccion && styles.visible}`}>
          {introduction[currentLang]}
          <div className={styles.contact}>
            <a
              className={styles.contact_button}
              href="https://github.com/Carlosmgs111"
              target="_blank"
            >
              <i className="fa-brands fa-github-alt"></i>&nbsp;&nbsp;Github
            </a>
            <a
              className={styles.contact_button}
              href="https://www.linkedin.com/in/cmgs111/"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin-in"></i>&nbsp;&nbsp;Linkedin
            </a>
          </div>
        </div>
      </article>
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
