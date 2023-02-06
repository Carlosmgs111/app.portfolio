import { MyState } from "./MyState";
import { Settings } from "./settings";

function ProfileHome() {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1>Bienvenido a tu perfil!</h1>
    </div>
  );
}

export { MyState, Settings, ProfileHome };
