import styles from "./styles.module.css";
import { AsyncImage } from "loadable-image";

export const CertificateIndex = ({ image, url }: any) => {
  return (
    <div className={styles.body}>
      <AsyncImage
        style={{ width: "100%", height: "100%", borderRadius: ".8rem" }}
        src={image}
      />
      <a href={url} target="_blank"></a>
    </div>
  );
};
