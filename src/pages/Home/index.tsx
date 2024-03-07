import styles from "./styles.module.css";
import { CodeSnap } from "../../components/CodeSnap";
import { Typing } from "../../components/Typing";

export function Home() {
  const literalCodeSnapshot = `
1 |
2 | class Developer {
3 |   name: string = "";
4 |   lastName: string = "";
5 |
6 |   constructor(name: string, lastName: string) {
7 |     this.name = name;
8 |     this.lastName = lastName;
9 |   };
10|
11|   presentYourSelf(): string {
12|     return \`
13|     Hi! I'm \${this.name} \${this.lastName}
14|     <{*Typing*}>
15|     \`;
16|   };
17| };
18|
19| const Carlos = new Developer("Carlos", "Muñoz");
20| console.log(Carlos.presentYourSelf())
21|
  `;

  const words = [
    {
      content: "NodeJS",
      color: "#339986",
    },
    {
      content: "ReactJS",
      color: "#fb9c61",
    },
    {
      content: "APIRest",
      color: "#a45063",
    },
    {
      content: "Django",
      color: "#ab3790",
    },
    {
      content: "GOlang",
      color: "#a54246",
    },
    {
      content: "Ziglang",
      color: "#ad32bd",
    },
  ];

  const words1 = [
    {
      content: "Backend",
      color: "#339933",
    },
    {
      content: "Frontend",
      color: "#61dafb",
    },
    {
      content: "Fullstack",
      color: "#e0234e",
    },
    {
      content: "Python",
      color: "#3776ab",
    },
    {
      content: "Javascript",
      color: "#f7df1e",
    },
    {
      content: "Typescript",
      color: "#3178c6",
    },
  ];
  return (
    <div className={styles.container}>
      <article className={styles.section.concat(" ", styles.hero)}>
        <div className={styles.presentation_section}>
          <h1>
            Hola, soy <br />
            <b>Carlos Muñoz</b>,
          </h1>
          <h2
            style={{
              display: "inline-flex",
              gap: "1rem",
            }}
          >
            desarrollador <Typing words={words} fontSize={"3.2rem"}></Typing>
          </h2>
        </div>
        <div className={styles.coding_section}>
          <CodeSnap fontSize={"1.4rem"} words={words1}>
            {literalCodeSnapshot}
          </CodeSnap>
          <div className={styles.console}>
            <span>{" > "}</span>
            <div className={styles.output}>
              <span>Hi! I'm Carlos Muñoz</span>
              <Typing
                words={words1}
                text={"Developer"}
                cursor={false}
                fontSize={"1.6rem"}
              />
            </div>
          </div>
        </div>
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
