import { Container, Image, Url, Dashboard } from "./styles";

export function Certification({ src = "", setCurrentModal = () => {} }) {
  return (
    <Container>
      <Image
        src={src}
        onClick={() =>
          setCurrentModal(
            <Image
              zoomed={true}
              onClick={() => setCurrentModal(null)}
              src={src}
            />
          )
        }
      ></Image>
      {/* <Dashboard>
        <Url href="https://user-images.githubusercontent.com/41123597/192820954-929acdc8-5012-4a95-92fa-6f635aaef161.jpg">
          URL
        </Url>
      </Dashboard> */}
    </Container>
  );
}
