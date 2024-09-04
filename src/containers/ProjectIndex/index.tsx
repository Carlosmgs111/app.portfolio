import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { labelCases } from "../../utils";

export const ProjectIndex = ({
  images,
  name,
  uri,
  descriptions,
  codeUri,
}: any) => {
  return (
      <div className={styles.body}>
        <img className={styles.background} src={images[0]} alt="" />
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
              Ir a detalles
            </Link>
            <a
              className={`${!codeUri && styles.disabled}`}
              href={codeUri}
              target="_blank"
            >
              Ver Codigo
            </a>
          </div>
        </div>
      </div>
  );
};
