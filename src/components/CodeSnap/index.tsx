import styles from "./styles.module.css";
import { Typing } from "../../components/Typing";

const typings: any = { Typing };

const parser = (text: string, words: []) => {
  const tokens: Array<any> = [];
  const chars: Array<string> = text.split("");
  let skipTo = 0;
  let currentTokenIndex = 0;

  chars.forEach((char: string, index) => {
    if (skipTo > index) return;
    const checkChar = (
      pattern: string | Function,
      pre: Function,
      pos?: Function
    ) => {
      if (skipTo !== index) return;
      let toCheck = "";
      if (typeof pattern === "function") {
        const result = pattern();
        if (result || result === 0) {
          skipTo = index + String(result).length;
          tokens[currentTokenIndex] = pre();
          currentTokenIndex++;
        }
        return;
      }
      const patternLength = pattern.length;
      for (let i = 0; i < patternLength; i++) toCheck += chars[index + i];
      if (toCheck !== pattern) return;
      skipTo = index + patternLength;
      tokens[currentTokenIndex] = pre();
      currentTokenIndex++;
      if (!pos) return;
      tokens[currentTokenIndex] = pos();
      currentTokenIndex++;
    };
    checkChar("constructor", () => (
      <span style={{ color: "#fd06f9" }}>constructor</span>
    ));
    checkChar("return", () => <span style={{ color: "#0de99c" }}>return</span>);
    checkChar("const", () => <span style={{ color: "#0de99c" }}>const</span>);
    checkChar("string", () => <span style={{ color: "#10a1e4" }}>string</span>);
    checkChar("new", () => <span style={{ color: "#0de99c" }}>new</span>);
    checkChar("this", () => <span style={{ color: "#0de99c" }}>this</span>);
    checkChar("{", () => <span style={{ color: "#fd9e06" }}>{char}</span>);
    checkChar("}", () => <span style={{ color: "#fd9e06" }}>{char}</span>);
    checkChar(";", () => <span style={{ color: "#fd4806" }}>{char}</span>);
    checkChar("=", () => <span style={{ color: "#fd4806" }}>{char}</span>);
    checkChar("$", () => <span style={{ color: "#fd4806" }}>{char}</span>);
    checkChar(":", () => <span style={{ color: "#fd4806" }}>{char}</span>);
    checkChar(",", () => <span style={{ color: "#fd4806" }}>{char}</span>);
    checkChar(".", () => <span style={{ color: "#fd4806" }}>{char}</span>);
    checkChar(")", () => <span style={{ color: "#fd9e06" }}>{char}</span>);
    checkChar("`", () => <span style={{ color: "#aee90d" }}>{char}</span>);
    checkChar("|", () => <span style={{ color: "#0bf2f6" }}>{char}</span>);
    checkChar(
      () => Number(char),
      () => <span style={{ color: "#f60b6d" }}>{char}</span>
    );
    checkChar('"', () => {
      let content: any = "";
      for (let i = 0; i > -1; i++) {
        if (chars[skipTo + i] === '"') {
          skipTo = skipTo + i + 1;
          i = -2;
        }
        if (i === 1000) i = -2;
        content += chars[skipTo + i];
      }

      content = content.split("");
      content.pop();
      content = content.join("");
      return <span style={{ color: "#aee90d" }}>{`"${content}"`}</span>;
    });
    checkChar("(", () => {
      let funcName: any = "";
      if (chars[index - 1] !== " ") {
        for (let i = 0; i > -1; i++) {
          if (
            i === 1000 ||
            chars[index - (i + 1)] === " " ||
            chars[index - (i + 1)] === "."
          )
            i = -2;
          funcName += chars[index - (i + 1)];
        }
        funcName = funcName.split("");
        funcName.pop();
        funcName.reverse();
        funcName = funcName.join("");
      }
      const rule = [<span style={{ color: "#fd9e06" }}>{char}</span>];
      if (typeof tokens[currentTokenIndex - 1] === "string") {
        tokens[currentTokenIndex - 1] = tokens[currentTokenIndex - 1].replace(
          funcName,
          ""
        );
        rule.unshift(<span style={{ color: "#fd9e06" }}>{funcName}</span>);
      }
      return rule;
    });
    checkChar(
      "class",
      () => <span style={{ color: "#0de99c" }}>class</span>,
      () => {
        let className: any = "";
        for (let i = 0; i > -1; i++) {
          if (chars[skipTo + i] === "{") {
            skipTo = skipTo + i + 1;
            i = -2;
          }
          if (i === 1000) i = -2;
          className += chars[skipTo + i];
        }
        className = className.split("");
        className.pop();
        className = className.join("");
        return [
          <span style={{ color: "#fd06f9" }}>{className}</span>,
          <span style={{ color: "#fd9e06" }}>{"{"}</span>,
        ];
      }
    );
    checkChar("<{*", () => {
      let funcName: any = "";
      for (let i = 0; i > -1; i++) {
        if (
          chars[skipTo + i] + chars[skipTo + i + 1] + chars[skipTo + i + 2] ===
          "*}>"
        ) {
          skipTo = skipTo + i + 3;
          i = -2;
        }
        if (i === 1000) i = -2;
        funcName += chars[skipTo + i];
      }

      funcName = funcName.split("");
      funcName.pop();
      funcName = funcName.join("");
      return (
        <span style={{ display: "inline-flex" }}>
          {typings[funcName]({
            text: "Developer",
            fontSize: "1.6rem",
            words,
          })}
        </span>
      );
    });
    if (skipTo === index) {
      if (
        tokens[currentTokenIndex - 1] &&
        typeof tokens[currentTokenIndex - 1] === "string" &&
        typeof char === "string"
      ) {
        tokens[currentTokenIndex - 1] += char;
      }
      if (typeof tokens[currentTokenIndex - 1] !== "string") {
        tokens[currentTokenIndex] = char;
        currentTokenIndex++;
      }
      skipTo = index + 1;
    }
  });
  return tokens;
};

export const CodeSnap = ({
  literal,
  children,
  fontSize = "1.8rem",
  words,
}: any) => {
  return (
    <section style={{ fontSize }} className={styles.codesnap}>
      {parser(literal || children, words)}
    </section>
  );
};
