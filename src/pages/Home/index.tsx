import styles from "./styles.module.css";
import { Typing } from "../../components/Typing";
import { GitHubSVG, LinkedInSVG } from "../../icons";
import { InfiniteCarousel } from "../../components/InfiniteCarousel";
import { useStateValue } from "../../contexts/context";
import { ProjectIndex } from "../../containers/ProjectIndex";
import { CertificationIndex } from "../../containers/CertificationIndex";
import { URL_API } from "../../../src/services";
import { useNearScreen } from "../../hooks/useNearScreen";
import { useToggle } from "../../hooks/useToggle";
import { useEffect, useState } from "react";
import { actionTypes } from "../../index";
import { TechSkills } from "../../containers/TechSkills";

export function Home({}: any) {
  const [{ currentLang, projects, certifications }, dispatch] = useStateValue();
  const [projectsIndexes, setProjectsIndexes] = useState(projects);
  const [certificationsIndexes, setCertificationsIndexes] =
    useState(certifications);

  const mySkills = [
    { content: "React", color: "#61DAFB" },
    {
      content: "Node.js",
      color: "#339933",
    },
    { content: "HTML5", color: "#E34F26" },
    {
      content: "Python",
      color: "#3776ab",
    },
    { content: "PostgreSQL", color: "#4169E1" },
    { content: "Socket.io", color: "#010101" },
    { content: "CSS3", color: "#1572B6" },
    {
      content: "Javascript",
      color: "#f7df1e",
    },
    { content: "MongoDB", color: "#47A248" },
    { content: "GraphQL", color: "#E10098" },
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
  const [showIntroduccion, toggleShowIntroduccion] = useToggle(false, true);

  const [introductionRef] = useNearScreen(
    false,
    (_: any, show: any) => show && !showIntroduccion && toggleShowIntroduccion()
  );

  useEffect(() => {
    if (!projectsIndexes[0]) {
      fetch(`${URL_API}/projects`, { method: "GET" })
        .then((data) => data.json())
        .then(({ projects, kind, state, stack }) => {
          setProjectsIndexes(projects);
          dispatch({
            type: actionTypes.setProjectsOptions,
            payload: { kind, stack, state },
          });
          dispatch({ type: actionTypes.setProjects, payload: projects });
        });
    }
    if (!certificationsIndexes[0]) {
      fetch(`${URL_API}/certifications`, { method: "GET" })
        .then((data) => data.json())
        .then((data) => {
          setCertificationsIndexes(data);
          dispatch({
            type: actionTypes.setCertifications,
            payload: data,
          });
        });
      fetch(`${URL_API}/institutions`, { method: "GET" })
        .then((data) => data.json())
        .then((data) => {
          dispatch({
            type: actionTypes.setInstitutions,
            payload: data,
          });
        });
    }
  }, []);

  const titles: any = {
    projects: { es: "Mis Proyectos", en: "My Projects" },
    certifications: { es: "Mis Certificados", en: "My Certifications" },
    techs: { es: "Las tecnologías que domino", en: "The technologies i master" },
  };

  return (
    <div className={styles.page}>
      <article
        ref={introductionRef}
        className={`${styles.section} ${styles.hero}`}
      >
        <section
          className={`${styles.introduction_section} ${
            showIntroduccion && styles.visible
          }`}
        >
          {introduction[currentLang]}
          <div className={styles.contact}>
            <a
              className={styles.contact_icon}
              href="https://github.com/Carlosmgs111"
              target="_blank"
            >
              <GitHubSVG></GitHubSVG>
            </a>
            <a
              className={styles.contact_icon}
              href="https://www.linkedin.com/in/cmgs111/"
              target="_blank"
            >
              <LinkedInSVG></LinkedInSVG>
            </a>
          </div>
        </section>
      </article>
      <article className={`${styles.section} `}>
        <h2>{titles.projects[currentLang]}</h2>
        <InfiniteCarousel toRight={true} timing={50}>
          {projectsIndexes.map((project: any) => (
            <ProjectIndex {...project} />
          ))}
        </InfiniteCarousel>
      </article>
      <article className={`${styles.section} `}>
        <h2>{titles.certifications[currentLang]}</h2>
        <InfiniteCarousel timing={30} gap={"2rem"}>
          {certificationsIndexes.map((certification: any) => (
            <CertificationIndex {...certification} />
          ))}
        </InfiniteCarousel>
        <InfiniteCarousel timing={30} gap={"2rem"} toRight={true}>
          {certificationsIndexes.map((certification: any) => (
            <CertificationIndex {...certification} />
          ))}
        </InfiniteCarousel>
      </article>
      <article className={`${styles.section}`}>
        <h2>{titles.techs[currentLang]}</h2>
        <TechSkills></TechSkills>
      </article>
    </div>
  );
}
