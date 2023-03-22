import { Dashboard, Container, Switch, Slider, Hide } from "./styles";

export function SettingsDashboard({
  float,
  switchFloat,
  settingsDashboard,
  switchSettingsDashboard,
}) {
  return (
    <Container>
      <Dashboard show={settingsDashboard} onClick={switchSettingsDashboard}>
        <Hide className="fa-solid fa-caret-left"/>
        <form>
          <label>Flotante: </label>
          <Switch className="switch ">
            <input
              checked={float}
              type="checkbox"
              name="based-on"
              onChange={switchFloat}
            ></input>
            <Slider className={`slider round fa-solid fa-circle-dot`}></Slider>
          </Switch>
        </form>
      </Dashboard>
    </Container>
  );
}
