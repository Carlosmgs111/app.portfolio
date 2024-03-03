import styled from "styled-components";

export const TypingContainer: any = styled.div``;

export const TypingText: any = styled.div`
  content: "";
  background-color: transparent;
  width: fit-content;
  height: 100%;
  overflow: hidden;
  border-right: 0.2rem solid transparent;
  animation: typing 24s steps(14) infinite
    ${({ cursor }: any) => cursor && ", cursor 0.6s infinite"};
  @keyframes typing {
    ${({ typingRules }: any) => typingRules}
  }
  @keyframes cursor {
    to {
      border-right: 0.2rem solid #2f3542;
    }
  }
`;
