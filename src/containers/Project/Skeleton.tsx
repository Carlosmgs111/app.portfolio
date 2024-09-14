import styles from "./styles.module.css";

export const ProjectSkeleton = () => (
  <div className={`${styles.skeleton_container}`}>
    <h1 className={`${styles.title} ${styles.skeleton}`}></h1>
    <div className={styles.skeleton_images_container}>
      <div className={`${styles.big_image} ${styles.skeleton}`} />
      <div style={{ display: "flex", gap: "2rem" }}>
        <div className={`${styles.small_image} ${styles.skeleton}`} />
        <div className={`${styles.small_image} ${styles.skeleton}`} />
      </div>
    </div>
    <div className={styles.skeleton_descriptions}>
      <div className={`${styles.skeleton_description} ${styles.skeleton}`} />
      <div className={`${styles.skeleton_description} ${styles.skeleton}`} />
      <div className={`${styles.skeleton_description} ${styles.skeleton}`} />
    </div>
    <div className={styles.skeleton_metadata}>
      <div className={`${styles.state} ${styles.skeleton}`}></div>
      <div className={`${styles.state} ${styles.skeleton}`}></div>
    </div>
  </div>
);
