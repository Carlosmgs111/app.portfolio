import styles from "./styles.module.css";
import { Image } from "../../components/Image";

export const CertificationIndex = ({ image, url }: any) => {
  return (
    <div className={styles.body}>
      <Image src={image} />
      <a href={url} target="_blank"></a>
    </div>
  );
};
