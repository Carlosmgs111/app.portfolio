import styled, { css, keyframes } from "styled-components";

const words = ({ $wordsrules }: any) => keyframes`
  ${$wordsrules}
`;
const typing = ({ $typingrules }: any) => keyframes`
  ${$typingrules}
`;
const cursorAnimation = keyframes` to {
  border-right: 0.2rem solid #c2c2c2;
}
`;

export const composeTypingRules = (size: number) => {
  const start: any = [];
  const end: any = [];
  const base = 100 / size / 4;
  for (let i = 0; i <= size; i++) {
    const first = base * (i * 4);
    const second = base * (i * 4 + 1);
    const third = base * (i * 4 + 2);
    const fourth = base * (i * 4 + 3);
    if (first <= 100) start.push(`${first}%,\n`);
    if (second <= 100) start.push(`${second}%,\n`);
    if (third <= 100) end.push(`${third}%,\n`);
    if (fourth <= 100) end.push(`${fourth}%,\n`);
  }
  if (size % 2) start[end.length] = "100%,\n";
  start[start.length - 1] = start[start.length - 1].replace(
    ",",
    " {\n width: 0%;\n}"
  );
  end[end.length - 1] = end[end.length - 1].replace(
    ",",
    " {\n  width: 100%;\n}"
  );
  return [start.join(""), "\n", end.join("")].join("");
};

export const composeWordsRules = (words: any) => {
  const base = 100 / words.length;
  let percentage = 0;
  const wordsRules = [];
  for (let i in words) {
    const { content, color } = words[i];
    wordsRules[Number(i)] = `${percentage}%,\n`;
    percentage += base;
    if (percentage > 100) percentage = 100;
    wordsRules[
      Number(i)
    ] += `${percentage}% {\n  content: "${content}";\n  color: ${color};\n}\n`;
    percentage += base / 100;
  }
  return wordsRules;
};

export const TypingContainer: any = styled.div`
  width: fit-content;
  display: flex;
  span {
    position: relative;
    margin-right: 0.4rem;
  }
  span::before {
    ${({ $timing, $wordsrules, $initword }: any) => css`
      ${$initword}
      animation: ${words({ $wordsrules })} ${$timing} infinite;
    `}
    width: fit-content;
  }
  p {
    white-space: nowrap;
  }
`;

export const TypingText: any = styled.div`
  content: "";
  background-color: transparent;
  width: fit-content;
  height: 100%;
  overflow: hidden;
  border-right: 0.2rem solid transparent;
  animation: ${({ $typingrules }: any) => typing({ $typingrules })}
    ${({ $timing }: any) => $timing} steps(14) infinite
    ${({ $cursor }: any) => $cursor && css`,${cursorAnimation} 0.6s infinite`};
`;
