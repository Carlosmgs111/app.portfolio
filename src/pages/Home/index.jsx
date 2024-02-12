import styles from "./styles.module.css";

export function Home() {
  return (
    <div className={styles.container}>
      <article className={styles.section}>
        <p className={styles.text}>
          Anim ex nostrud exercitation exercitation anim aliqua. Sit Lorem id
          laborum proident eu ad Lorem culpa. Occaecat ipsum exercitation
          consequat aute ullamco. Commodo enim voluptate aliqua pariatur ipsum
          tempor enim velit nisi. Officia ut adipisicing veniam enim esse aliqua
          minim Lorem esse amet ut elit ullamco et. Id reprehenderit cillum
          mollit qui esse. Do sint dolor sunt adipisicing est eu tempor proident
          sunt commodo ipsum occaecat tempor incididunt. Dolore consectetur
          nostrud sunt aliquip eiusmod velit. Irure mollit duis sint dolore.
          Aliqua quis amet est minim occaecat ipsum laboris do laboris minim
          nostrud anim. Qui adipisicing velit cupidatat adipisicing Lorem.
          Aliquip duis elit deserunt ad. Aute id ut tempor duis dolor anim.
        </p>
      </article>
      <article className={styles.section.concat(" ", styles.even)}>
        <p className={styles.text}>
          Anim ex nostrud exercitation exercitation anim aliqua. Sit Lorem id
          laborum proident eu ad Lorem culpa. Occaecat ipsum exercitation
          consequat aute ullamco. Commodo enim voluptate aliqua pariatur ipsum
          tempor enim velit nisi. Officia ut adipisicing veniam enim esse aliqua
          minim Lorem esse amet ut elit ullamco et. Id reprehenderit cillum
          mollit qui esse. Do sint dolor sunt adipisicing est eu tempor proident
          sunt commodo ipsum occaecat tempor incididunt. Dolore consectetur
          nostrud sunt aliquip eiusmod velit. Irure mollit duis sint dolore.
          Aliqua quis amet est minim occaecat ipsum laboris do laboris minim
          nostrud anim. Qui adipisicing velit cupidatat adipisicing Lorem.
          Aliquip duis elit deserunt ad. Aute id ut tempor duis dolor anim.
        </p>
      </article>
    </div>
  );
}
