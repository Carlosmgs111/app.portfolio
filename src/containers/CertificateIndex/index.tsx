import styles from "./styles.module.css";
import { AsyncImage } from "loadable-image";
import { Link } from "react-router-dom";

export const CertificateIndex = ({ image, url }: any) => {
  console.log({ url });
  return (
    <div className={styles.body}>
      <AsyncImage
        style={{ width: "100%", height: "100%", borderRadius: ".8rem" }}
        src={image}
      />
      <Link to={url} target="_blank" preventScrollReset={true}></Link>
    </div>
  );
};
