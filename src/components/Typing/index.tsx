import styles from "./styles.module.css";
import { TypingText } from "./styles";

const composeTypingRules = (numb: number) => {
  const start: any = [];
  const end: any = [];
  for (let i = 0; i <= numb; i++) {
    const base = Math.floor(100 / numb / 4);
    const first = base * (i * base);
    const second = base * (i * base + 1);
    const third = base * (i * base + 2);
    const fourth = base * (i * base + 3);
    if (first <= 100) start.push(`${first}%,\n`);
    if (second <= 100) start.push(`${second}%,\n`);
    if (third <= 100) end.push(`${third}%,\n`);
    if (fourth <= 100) end.push(`${fourth}%,\n`);
  }
  start[start.length - 1] = start[start.length - 1].replace(
    ",",
    " {\n width: 0%;\n}"
  );
  end[end.length - 1] = end[end.length - 1].replace(",", " {\n  width: 100%;\n}");
  return [start.join(""), "\n", end.join("")].join("");
};

export const Typing = ({
  cursor = true,
  text = "",
  fontSize = "3.8rem",
  fontWeight = 500,
}: any) => {
  return (
    <div style={{ fontSize, fontWeight }} className={styles.typing_container}>
      <TypingText typingRules={composeTypingRules(6)} cursor={cursor}>
        <span></span>
      </TypingText>
      {text}
    </div>
  );
};
