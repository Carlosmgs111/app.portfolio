import { useEffect, useState, Children, cloneElement } from "react";
import {
  FloatContainer,
  Wrapper,
  Sidebar,
  Body,
  Header,
  Footer,
  Item,
  Main,
} from "./styles";
import { SettingsDashboard } from "./SettingsDashboard";
import { useSwitch } from "../../../hooks/useSwitch";
import { injectAttrsToReactElements } from "../../../utils";

export const MultiSidebar = (props) => {
  const { sidebars = [], children } = props;
  const [expand, switchExpand] = useSwitch(false, true);
  const [activeSidebars, setActiveSidebars] = useState([sidebars[0]?.props.id]);
  const [settingsDashboard, switchSettingsDashboard] = useSwitch(false, true);
  const [float, switchFloat] = useSwitch(false, true);

  useEffect(() => {}, []);

  const main = (
    <FloatContainer>
      <Main>
        <Sidebar>
          {sidebars.length > 1 && (
            <Header>
              {sidebars.map((sidebar, index) => (
                <Item
                  key={index}
                  // href="#"
                  onClick={() => setActiveSidebars([sidebar.props.id])}
                  active={activeSidebars.includes(sidebar.props.id)}
                >
                  {index + 1}
                </Item>
              ))}
              {activeSidebars.length !== sidebars.length && (
                <Item
                  // href="#"
                  key="expand-button"
                  className="fa-solid fa-ellipsis"
                  onClick={() =>
                    setActiveSidebars([
                      ...sidebars.map((sidebar) => sidebar.props.id),
                    ])
                  }
                />
              )}
            </Header>
          )}
          <Body {...{ active: activeSidebars.length > 1 }}>
            {sidebars.map((sidebar, index) =>
              injectAttrsToReactElements([sidebar], {
                active: activeSidebars.includes(sidebar.props.id),
                key: index,
              })
            )}
          </Body>
          <Footer>
            <Item
              key="settings-button"
              className="fa-solid fa-gear rotable"
              active={settingsDashboard}
              onClick={switchSettingsDashboard}
            ></Item>
          </Footer>
        </Sidebar>
        <SettingsDashboard
          {...{
            float,
            switchFloat,
            settingsDashboard,
            switchSettingsDashboard,
          }}
        />
      </Main>
    </FloatContainer>
  );

  return children ? (
    <>
      {float && main}
      <Wrapper>
        {!float && main}
        {Children.toArray(children).map((child) =>
          cloneElement(child, {
            ...child.props,
          })
        )}
      </Wrapper>
    </>
  ) : (
    main
  );
};
