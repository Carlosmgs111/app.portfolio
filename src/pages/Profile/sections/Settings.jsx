import { DefineSchema } from "../../../components/DefineSchema";
import { useState } from "react";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";

export function Settings() {
  const [data, setData] = useState(null);
  const requestHeaders = headers();
  console.log({ data });
  return (
    <div style={{ width: "30%", alignSelf:"center" }}>
      <DefineSchema
        {...{
          title: "Usuario",
          baseSchema: {
            evento: "",
            cantidad: 0.1,
            etiquetas: [""],
            opcion: "",
            "opcion{": ["uno", "dos"],
            fecha: new Date().getTime(),
            "fecha~": new Date().toISOString().slice(0, 10),
            activo: false,
          },
          nonOptionals: [
            "evento",
            "cantidad",
            "tags",
            "opcion{",
            "fecha~",
            "activo",
          ],
          buttons: { main: "Cambiar" },
          onClickHandler: ({ setError, setLoading, parsedSchema, reset }) => {
            const { nombreDeUsuario: newUsername } = parsedSchema[0];
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
      <DefineSchema
        {...{
          title: "Cambiar Nombre de Usuario",
          baseSchema: {
            nombreDeUsuario: "",
          },
          nonOptionals: ["nombreDeUsuario"],
          buttons: { main: "Cambiar" },
          onClickHandler: ({ setError, setLoading, parsedSchema, reset }) => {
            const { nombreDeUsuario: newUsername } = parsedSchema[0];
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
      <DefineSchema
        {...{
          title: "Actualizar Avatar",
          baseSchema: {
            nuevoAvatar: "",
          },
          nonOptionals: ["nuevoAvatar"],
          buttons: { main: "Cambiar" },
          onClickHandler: ({ setError, setLoading, parsedSchema, reset }) => {
            const { nuevoAvatar: newAvatar } = parsedSchema[0];
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
      <DefineSchema
        {...{
          title: "Cambiar Contraseña",
          baseSchema: {
            contraseña: "",
            nuevaContraseña: "",
          },
          nonOptionals: ["contraseña", "nuevaContraseña"],
          buttons: { main: "Cambiar" },
          onClickHandler: ({ setError, setLoading, parsedSchema, reset }) => {
            const { contraseña: oldPassword, nuevaContraseña: newPassword } =
              parsedSchema[0];
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
  );
}
