import { Body, Title } from "./styles";
import { css } from "styled-components";
import { formatToCss } from "../../utils";
import { getContextValue, CONTEXTS } from "../../contexts";

export function Banner({
  children,
  config = {},
  searchedUsername,
  customeMessage = true,
}) {
  const { username } = getContextValue(CONTEXTS.Global);
  // console.log({ searchedUsername });
  return (
    <Body
      {...{
        styles: css`
          ${formatToCss(config, true)}
        `,
      }}
    >
      <Title>
        {customeMessage && username && "Tus "}
        {children}
        {customeMessage &&
          !username &&
          ` de ${searchedUsername ? searchedUsername : "la comunidad"}`}
      </Title>
    </Body>
  );
}
