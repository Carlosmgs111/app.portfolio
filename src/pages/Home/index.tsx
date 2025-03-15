import styles from "./styles.module.css";
import { ProjectIndex } from "../../containers/ProjectIndex";
import { CertificateIndex } from "../../containers/CertificateIndex";
import { TechSkills } from "../../containers/TechSkills";
import { Memo } from "../../components/Memo";
import { lazyLoad, LazyComponent } from "../../components/LazyComponent";
import { CubeGridLoader } from "../../components/CubeGridLoader";
import { useStateValue } from "../../context";
import { URL_API } from "../../../src/services";
import Helmet from "react-helmet";
const InfiniteCarousel = lazyLoad(
  () => import("../../components/InfiniteCarousel"),
  "InfiniteCarousel"
);
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Refs } from "../../components/Refs";
import { Introduction } from "../../components/Introduction";
const Section = ({ children, className }: any) => {
  return (
    <section className={`${styles.section} ${className}`}>{children}</section>
  );
};
export function Home({}: any) {
  const [
    { language, projects: globalProjects, certificates: globalCertificates },
    dispatch,
  ]: any = useStateValue();
  const [certificatesIndexes, setCertificatesIndexes] =
    useState(globalCertificates);
  const [projectsIndexes, setProjectsIndexes] = useState(globalProjects);
  const titles: any = {
    projects: { es: "Mis Proyectos", en: "My Projects" },
    certifications: { es: "Mis Certificados", en: "My Certificates" },
    techs: {
      es: "Las Tecnologías Que Domino",
      en: "Technologies I Master",
    },
  };
  useEffect(() => {
    if (!projectsIndexes[0]) {
      fetch(`${URL_API}/projects`, { method: "GET" })
        .then((data) => {
          console.log({ data });
          return data.json();
        })
        .then(({ projects, kind, state, stack }) => {
          setProjectsIndexes(projects);
          dispatch({
            projectsOptions: { kind, stack, state },
            projects,
          });
        });
    }
    if (!certificatesIndexes[0]) {
      fetch(`${URL_API}/certificates`, { method: "GET" })
        .then((data) => data.json())
        .then((data) => {
          setCertificatesIndexes(data);
          dispatch({
            certificates: data,
          });
        });
      fetch(`${URL_API}/institutions`, { method: "GET" })
        .then((data) => data.json())
        .then((data) => {
          dispatch({
            institutions: data,
          });
        });
    }
  }, []);

  return (
    <div className={styles.page}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home &bull; Carlos Muñoz Gachancipá</title>
      </Helmet>
      <Refs>
        <Introduction language={language} />
        <Section>
          <div>
            <h2>{titles.projects[language]}</h2>
            <Memo deps={[projectsIndexes]}>
              <LazyComponent
                Component={InfiniteCarousel}
                fallback={<CubeGridLoader />}
                toRight={true}
                gap={"8px"}
                timing={20}
              >
                {projectsIndexes.map((project: any, index: any) => (
                  <ProjectIndex key={index} {...project} />
                ))}
              </LazyComponent>
            </Memo>
            <Link to={{ pathname: "/portfolio/projects" }}>
              <i className="fa-solid fa-compass-drafting"></i>
              &nbsp;&nbsp;Consultar Todos Los Proyectos
            </Link>
          </div>
        </Section>
        <Section className={`${styles.section} `}>
          <div>
            <h2>{titles.certifications[language]}</h2>
            <Memo deps={[certificatesIndexes]}>
              <LazyComponent
                Component={InfiniteCarousel}
                fallback={<CubeGridLoader />}
                timing={30}
                gap={"4px"}
              >
                {certificatesIndexes.map((certification: any, index: any) => (
                  <CertificateIndex key={index} {...certification} />
                ))}
              </LazyComponent>
            </Memo>
            <Memo deps={[certificatesIndexes]}>
              <LazyComponent
                Component={InfiniteCarousel}
                fallback={<CubeGridLoader />}
                timing={30}
                gap={"4px"}
                toRight={true}
              >
                {certificatesIndexes.map((certification: any, index: any) => (
                  <CertificateIndex key={index} {...certification} />
                ))}
              </LazyComponent>
            </Memo>
            <Link to={{ pathname: "/portfolio/certificates" }}>
              <i className="fa-solid fa-award"></i>&nbsp;&nbsp;Consultar Todos
              Los Certificados
            </Link>
          </div>
        </Section>
        <Section className={`${styles.section}`}>
          <div>
            <h2>{titles.techs[language]}</h2>
            <Memo>
              <TechSkills></TechSkills>
            </Memo>
          </div>
        </Section>
      </Refs>
    </div>
  );
}
