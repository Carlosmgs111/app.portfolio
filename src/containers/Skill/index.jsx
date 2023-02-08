import { Content, Container, InnerContainer, Title, Image } from "./styles";
import { useNearScreen } from "../../hooks/useNearScreen";
import { labelCases } from "../../utils";
import { useEffect } from "react";
import { DefineSchema } from "../../components/DefineSchema";

export function Skill({ index, title, image, description, refreshRefs }) {
  const [show, ref] = useNearScreen(false, refreshRefs);
  useEffect(() => {}, [show, ref]);
  return (
    <Content ref={ref} reverse={index % 2 === 0} id={labelCases(title).LS}>
      <Title>{title}</Title>
      <Container reverse={index % 2 === 0}>
        <InnerContainer className="image">
          <Image src={image} />
        </InnerContainer>
        <InnerContainer reverse={index % 2 === 0} className="description">
          {description}
        </InnerContainer>
      </Container>
    </Content>
  );
}
