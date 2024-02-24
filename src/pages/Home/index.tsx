import styles from "./styles.module.css";
import { CodeSnap } from "../../components/CodeSnap";

export function Home() {
  const literalCodeSnapshot = `
1 |
2 |  class Developer {
3 |    name: string = "";
4 |    lastName: string = "";
5 |
6 |    constructor(name: string, lastName: string) {
7 |      this.name = name;
8 |      this.lastName = lastName;
9 |    };
10|
11|    presentYourSelf(): string {
12|      return \`
13|      Hi! I'm \${this.name} \${this.lastName}
14|      <{*Typing*}>
15|      \`;
16|    };
17|  };
18|
19|  const Carlos = new Developer("Carlos", "Muñoz");
20|
  `;

  return (
    <div className={styles.container}>
      <article className={styles.section.concat(" ", styles.hero)}>
        <CodeSnap fontSize={"1.6rem"}>{literalCodeSnapshot}</CodeSnap>
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
