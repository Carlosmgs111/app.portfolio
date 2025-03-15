import { useNearScreen } from "../../hooks/useNearScreen";
import { useToggle } from "../../hooks/useToggle";
import { Typing } from "../../components/Typing";
import styles from "./styles.module.css";

type props = {
  language: string;
};
export const Introduction = ({ language }: props) => {
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
  const [showIntroduccion, toggleShowIntroduccion] = useToggle(false, true);
  const [introductionRef] = useNearScreen(
    false,
    (_: any, show: any) => show && !showIntroduccion && toggleShowIntroduccion()
  );
  const introduction: any = {
    es: (
      <div className={styles.introduction}>
        <h1>
          Hola 👋, soy <br />
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
          Hi 👋, i'm <br />
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

  return (
    <article ref={introductionRef}>
      <div className={`${styles.hero} ${showIntroduccion && styles.visible}`}>
        {introduction[language]}
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
            <i className="fa-brands fa-linkedin-in"></i>
            &nbsp;&nbsp;Linkedin
          </a>
        </div>
      </div>
    </article>
  );
};
