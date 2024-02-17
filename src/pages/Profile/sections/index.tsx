import { MyState } from "./MyState";
import { Settings } from "./Settings";
import { TestsSection } from "./TestsSection";

function ProfileHome() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1>Bienvenido a tu perfil!</h1>
    </div>
  );
}

export { MyState, Settings, ProfileHome, TestsSection };
