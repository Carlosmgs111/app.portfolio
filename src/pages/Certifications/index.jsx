import { Certification } from "../../components/Certification";
import { Modal } from "../../components/Modal";
import { getContext, CONTEXTS } from "../../contexts";
import {
  Container,
  Main,
  Button,
  Dashboard,
  Sidebar,
  List,
  Item,
  Input,
} from "./styles";
import { useState } from "react";

export function Certifications() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ token, loading: globalLoading }, dispatch] = useStateValue();
  const [currentModal, setCurrentModal] = useState(null);

  const certificates = [
    {
      image:
        "https://user-images.githubusercontent.com/41123597/192820934-f5a7f8fc-04e2-42b3-8644-fb0ab1e04053.jpg",
    },
    {
      image:
        "https://user-images.githubusercontent.com/41123597/192820782-b80b869f-88f6-495e-abcf-da3feeae637a.jpg",
    },
    {
      image:
        "https://user-images.githubusercontent.com/41123597/192820816-3c85f659-a69d-498d-9fa9-7cf2551f86bb.jpg",
    },
    {
      image:
        "https://user-images.githubusercontent.com/41123597/192820921-4c587b5d-98f6-4a4e-bbd3-8e56be629091.jpg",
    },
    {
      image:
        "https://user-images.githubusercontent.com/41123597/192820971-60df94b9-19ad-4433-b6ff-8248e8e054b0.jpg",
    },
    {
      image:
        "https://user-images.githubusercontent.com/41123597/192820954-929acdc8-5012-4a95-92fa-6f635aaef161.jpg",
    },
  ];

  return (
    <>
      <Container>
        <Sidebar>
          <List>
            <Item id="1" className="fa-solid fa-magnifying-glass">
              <Input></Input>
            </Item>
            <Item id="1" className="fa-solid fa-street-view">
              <Input></Input>
            </Item>
            <Item id="1" className="fa-solid fa-eye">
              <Input></Input>
            </Item>
            <Item id="1" className="fa-solid fa-fingerprint">
              <Input></Input>
            </Item>
          </List>
        </Sidebar>
        <Main>
          {certificates.map((certificate, index) => (
            <Certification
              setCurrentModal={setCurrentModal}
              src={certificate.image}
            />
          ))}
          {token && (
            <Dashboard>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
            </Dashboard>
          )}
        </Main>
      </Container>
      <Modal
        {...{
          active: false,
          injected: currentModal,
        }}
      />
    </>
  );
}
