import {
  TypingContainer,
  TypingText,
  composeTypingRules,
  composeWordsRules,
} from "./styles";

export const Typing = ({
  cursor = true,
  text = "",
  words = [],
  fontSize = "3.8rem",
  fontWeight = 500,
  baseTiming = 4,
}: any) => {
  if (!words[0]) return null;
  const wordsLength = words.length;
  const typingRules = composeTypingRules(wordsLength);
  const composedWords = composeWordsRules(words);
  const wordsRules = composedWords.join("");
  const initWord = composedWords[0].split("{")[1].split("}")[0];
  const timing = `${baseTiming * wordsLength}s`;
  return (
    <TypingContainer
      {...{
        $timing: timing,
        $initword: initWord,
        $wordsrules: wordsRules,
        style: { fontSize, fontWeight },
      }}
    >
      <TypingText
        $timing={timing}
        $cursor={cursor.toString()}
        $typingrules={typingRules}
      >
        <span></span>
      </TypingText>
      <p>{text}</p>
    </TypingContainer>
  );
};
