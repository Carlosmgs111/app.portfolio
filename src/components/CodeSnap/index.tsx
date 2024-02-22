import styles from "./styles.module.css";
import { Typing } from "../../components/Typing";

const typings: any = { Typing };

const parser = (text: string) => {
  const tokens: Array<any> = [];
  const splitedText: Array<string> = text.split("");
  let jumpTo = 0;
  let currentTokenIndex = 0;

  splitedText.forEach((char: string, index) => {
    if (jumpTo > index) return;
    console.log({ currentTokenIndex, index });

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
      tokens[currentTokenIndex] = <span style={{ color: "pink" }}>{char}</span>;
      jumpTo = index + 1;
      currentTokenIndex++;
    }
    if (char === "(") {
      tokens[currentTokenIndex] = <span style={{ color: "cyan" }}>{char}</span>;
      jumpTo = index + 1;
      currentTokenIndex++;
    }
    if (char === ")") {
      tokens[currentTokenIndex] = <span style={{ color: "cyan" }}>{char}</span>;
      jumpTo = index + 1;
      currentTokenIndex++;
    }
    if (char === ":") {
      tokens[currentTokenIndex] = <span style={{ color: "blue" }}>{char}</span>;
      jumpTo = index + 1;
      currentTokenIndex++;
    }
    if (char === ",") {
      tokens[currentTokenIndex] = <span style={{ color: "pink" }}>{char}</span>;
      jumpTo = index + 1;
      currentTokenIndex++;
    }
    if (char === ".") {
      tokens[currentTokenIndex] = <span style={{ color: "pink" }}>{char}</span>;
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
      tokens[currentTokenIndex] = <span style={{ color: "red" }}>return</span>;
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
      tokens[currentTokenIndex] = (
        <span style={{ display: "inline-flex" }}>
          {typings["Typing"]("Developer")}
        </span>
      );
      currentTokenIndex++;
    }
    if (jumpTo === index) {
      tokens[currentTokenIndex] = char;
      currentTokenIndex++;
      jumpTo = index + 1;
    }
  });
  return tokens;
};

export const CodeSnap = ({ literal, children }: any) => {
  return (
    <section className={styles.codesnap}>{parser(literal || children)}</section>
  );
};
