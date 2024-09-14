import { DefineForms } from "../../../components/DefineForms";
import { useState } from "react";
import { runRequest} from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import { INPUT_TYPES } from "../../../components/DefineForms";

export function Settings({ avatar }: any) {
  const [data, setData] = useState(null);
  const requestHeaders = headers();

  return (
    <div style={{ width: "90rem", alignSelf: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "4rem 0",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
          DefineForms de Prueba
        </h3>
        <DefineForms
          {...{
            baseSchema: {
              evento: "",
              cantidad: 0.1,
              etiquetas: [""],
              rango: {
                inputType: INPUT_TYPES.RANGE,
                label: "rango",
                value: [0, 343],
                required: true,
                initValue: 117,
              },
              opcion: {
                inputType: INPUT_TYPES.SELECTION,
                label: "selection",
                value: ["Alpha", "Bravo", "Delta", "Charlie"],
                required: true,
                controlledValue: "Delta",
              },
              fecha: {
                inputType: INPUT_TYPES.DATE,
                label: "lapso",
                value: new Date().toISOString().slice(0, 10),
              },
              activo: false,
            },
            buttons: { main: "Cambiar" },
            modifiable: false,
            onClickHandler: ({ setError, setLoading, data, reset }: any) => {
              const { nombreDeUsuario: newUsername } = data[0];
              runRequest({
                setData,
              }).patch(
                `users/username/change`,
                { newUsername },
                {
                  ...requestHeaders,
                }
              );
              reset();
            },
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "4rem 0",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
          Cambiar Nombre de Usuario
        </h3>
        <DefineForms
          {...{
            baseSchema: {
              nombreDeUsuario: "",
            },
            buttons: { main: "Cambiar" },
            modifiable: false,
            onClickHandler: ({ setError, setLoading, data, reset }: any) => {
              const { nombreDeUsuario: newUsername } = data[0];
              runRequest({
                setData,
              }).patch(
                `users/username/change`,
                { newUsername },
                {
                  ...requestHeaders,
                }
              );
              reset();
            },
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "4rem 0",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
          Cambiar Avatar
        </h3>
        <DefineForms
          {...{
            baseSchema: {
              nuevoAvatar: "",
            },
            buttons: { main: "Cambiar" },
            modifiable: false,
            onClickHandler: ({ setError, setLoading, data, reset }: any) => {
              const { nuevoAvatar: newAvatar } = data[0];
              runRequest({
                setData,
              }).patch(
                `users/avatar/update`,
                { newAvatar },
                {
                  ...requestHeaders,
                }
              );
              reset();
            },
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "4rem 0",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
          Cambiar contraseña
        </h3>
        <DefineForms
          {...{
            baseSchema: {
              contraseña: "",
              nuevaContraseña: "",
            },
            buttons: { main: "Cambiar" },
            modifiable: false,
            onClickHandler: ({ setError, setLoading, data, reset }: any) => {
              const { contraseña: oldPassword, nuevaContraseña: newPassword } =
                data[0];
              runRequest({
                setData,
              }).patch(
                `users/password/reset`,
                { newPassword, oldPassword },
                {
                  ...requestHeaders,
                }
              );
              reset();
            },
          }}
        />
      </div>
    </div>
  );
}
