import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { labelCases } from "../../utils";
import { AsyncImage } from "loadable-image";
import { CubeGridLoader } from "../../components/CubeGridLoader";

export const ProjectIndex = ({
  images,
  name,
  uri,
  descriptions,
  codeUri,
}: any) => {
  return (
    <div className={styles.body}>
      <AsyncImage
        className={styles.background}
        src={images[0]}
        loader={<CubeGridLoader />}
        alt=""
      />
      <a href={uri} target="_blank"></a>
      <div className={styles.quick_info}>
        <h3>{name}</h3>
        <article>{descriptions[0]}</article>
        <div className={styles.quick_access}>
          <Link
            className={`${!uri && styles.disabled}`}
            to={{
              pathname: "projects",
              hash: labelCases(name).LS,
            }}
            preventScrollReset={true}
          >
            <i className="fa-solid fa-circle-info"></i>&nbsp;&nbsp; Mas
            Informacion
          </Link>
          <a
            className={`${!codeUri && styles.disabled}`}
            href={codeUri}
            target="_blank"
          >
            <i className="fa-solid fa-code"></i>&nbsp;&nbsp; Ver
            Codigo
          </a>
        </div>
      </div>
    </div>
  );
};
