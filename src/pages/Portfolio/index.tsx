import styles from "./styles.module.css";
import { ProjectIndex } from "../../containers/ProjectIndex";
import { CertificateIndex } from "../../containers/CertificateIndex";
import { TechSkills } from "../../containers/TechSkills";
import { Memo } from "../../components/Memo";
import { lazyLoad, LazyComponent } from "../../components/LazyComponent";
import { CubeGridLoader } from "../../components/CubeGridLoader";
import { useStateValue } from "../../contexts/context";
import { URL_API } from "../../../src/services";
import Helmet from "react-helmet";
const InfiniteCarousel = lazyLoad(
  () => import("../../components/InfiniteCarousel"),
  "InfiniteCarousel"
);
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Portfolio = ({}) => {
  const [{ language, projects, certificates }, dispatch] = useStateValue();
  const [certificatesIndexes, setCertificatesIndexes] = useState(certificates);
  const [projectsIndexes, setProjectsIndexes] = useState(projects);
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
        .then((data) => data.json())
        .then(({ projects, kind, state, stack }) => {
          setProjectsIndexes(projects);
          dispatch({
            projectsOptions: { kind, stack, state },
          });
          dispatch({ projects });
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
        <title>Portfolio &bull; Carlos Muñoz Gachancipá</title>
      </Helmet>
      <article className={`${styles.section} `}>
        <div>
          <h2>{titles.projects[language]}</h2>
          <Memo deps={[projects]}>
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
          <Link to={{ pathname: "/projects" }}>
            <i className="fa-solid fa-compass-drafting"></i>
            &nbsp;&nbsp;Consultar Todos Los Proyectos
          </Link>
        </div>
      </article>
      <article className={`${styles.section} `}>
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
          <Link to={{ pathname: "/certificates" }}>
            <i className="fa-solid fa-award"></i>&nbsp;&nbsp;Consultar Todos Los
            Certificados
          </Link>
        </div>
      </article>
      <article className={`${styles.section}`}>
        <div>
          <h2>{titles.techs[language]}</h2>
          <Memo>
            <TechSkills></TechSkills>
          </Memo>
        </div>
      </article>
    </div>
  );
};
