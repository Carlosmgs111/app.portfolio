import styles from "./styles.module.css";
import { Typing } from "../../components/Typing";

const typings: any = { Typing };

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
15|      \`
16|    };
17|  }
18|
19|  const Carlos = new Developer("Carlos", "Muñoz");
20|
  `;

  const parser = (text: string) => {
    const tokens: Array<any> = [];
    const splitedText: Array<string> = text.split("");
    let jumpTo = 0;
    let currentTokenIndex = 0;

    splitedText.forEach((char: string, index) => {
      if (jumpTo > index) return;

      if (char === "{") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "yellow" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === "}") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "yellow" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === '"') {
        tokens[currentTokenIndex] = (
          <span style={{ color: "green" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === ";") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "orange" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === "=") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "pink" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === "(") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "cyan" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === ")") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "cyan" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === ":") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "blue" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === ",") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "pink" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (char === ".") {
        tokens[currentTokenIndex] = (
          <span style={{ color: "pink" }}>{char}</span>
        );
        jumpTo = index + 1;
        currentTokenIndex++;
      }
      if (
        char +
          splitedText[index + 1] +
          splitedText[index + 2] +
          splitedText[index + 3] +
          splitedText[index + 4] ===
        "class"
      ) {
        jumpTo = index + 5;
        tokens[currentTokenIndex] = <span style={{ color: "red" }}>class</span>;
        currentTokenIndex++;

        let className = "";
        for (let i = 0; i > -1; i++) {
          if (splitedText[jumpTo + i] === "{") {
            jumpTo = jumpTo + i + 1;
            i = -2;
          }
          if (i === 1000) i = -2;
          className += splitedText[jumpTo + i];
        }
        console.log({ className });
        tokens[currentTokenIndex] = [
          <span style={{ color: "yellow" }}>{className}</span>,
          <span style={{ color: "yellow" }}>{"{"}</span>,
        ];
        currentTokenIndex++;
      }
      if (char + splitedText[index + 1] + splitedText[index + 2] === "new") {
        jumpTo = index + 3;
        tokens[currentTokenIndex] = <span style={{ color: "red" }}>new</span>;
        currentTokenIndex++;
      }
      if (
        char +
          splitedText[index + 1] +
          splitedText[index + 2] +
          splitedText[index + 3] ===
        "this"
      ) {
        jumpTo = index + 4;
        tokens[currentTokenIndex] = <span style={{ color: "red" }}>this</span>;
        currentTokenIndex++;
      }
      if (
        char +
          splitedText[index + 1] +
          splitedText[index + 2] +
          splitedText[index + 3] +
          splitedText[index + 4] +
          splitedText[index + 5] ===
        "return"
      ) {
        jumpTo = index + 6;
        tokens[currentTokenIndex] = (
          <span style={{ color: "red" }}>return</span>
        );
        currentTokenIndex++;
      }
      if (char + splitedText[index + 1] + splitedText[index + 2] === "<{*") {
        jumpTo = index + 3;
        let funcName = "";
        for (let i = 0; i > -1; i++) {
          if (
            splitedText[jumpTo + i] +
              splitedText[jumpTo + i + 1] +
              splitedText[jumpTo + i + 2] ===
            "*}>"
          ) {
            jumpTo = jumpTo + i + 3;
            i = -2;
          }
          if (i === 1000) i = -2;
          funcName += splitedText[jumpTo + i];
        }
        console.log({
          funcName,
        });
        tokens[currentTokenIndex] = typings["Typing"]("Developer");
        currentTokenIndex++;
      }
      if (jumpTo === index) {
        tokens[currentTokenIndex] = char;
        currentTokenIndex++;
        jumpTo = index + 1;
      }
    });
    console.log({ tokens });
    return tokens;
  };
  const spansCodeSnapshot: any = literalCodeSnapshot
    .split("\n")
    .map((codeLine: string, key: number) => {
      if (!codeLine.trim()) return;
      const parsedCodeLine: any = [];
      String(codeLine)
        .split(/<\{([^}]*)\}>/)
        .forEach((e) => {
          if (RegExp(/\*([^}]+)\*/).test(e))
            return parsedCodeLine.push(
              typings[e.replaceAll("*", "")]("Developer")
            );
          return parsedCodeLine.push(e);
        });
      return (
        <span key={key} className={styles.code_line}>
          {parsedCodeLine}
        </span>
      );
    });
  // console.log({ spansCodeSnapshot });
  const simulated = [
    <span>Hello</span>,
    <span>{"{"}</span>,
    "\n",
    [
      "Otra LInea",
      "\n",
      "   ",
      <span>function</span>,
      <span>{"{"}</span>,
      "\n",
      ["    Otra linea mas"],
    ],
  ];
  return (
    <div className={styles.container}>
      <article className={styles.section.concat(" ", styles.hero)}>
        {/* <Typing /> */}
        <section className={styles.code_snapshot}>{simulated}</section>
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
