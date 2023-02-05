import { DefineSchema } from "../../../components/DefineSchema";
import { useState } from "react";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";

export function Settings() {
  const [data, setData] = useState(null);
  const requestHeaders = headers();
  console.log({ data });
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <h3>Cambiar Contraseña</h3>
        <div>
          <DefineSchema
            {...{
              title: "Cambiar Contraseña",
              baseSchema: {
                contraseña: "",
                nuevaContraseña: "",
              },
              nonOptionals: ["contraseña", "nuevaContraseña"],
              buttons: ["save"],
              onClickHandler: ({
                setError,
                setLoading,
                parsedSchema,
                reset,
              }) => {
                const {
                  contraseña: oldPassword,
                  nuevaContraseña: newPassword,
                } = parsedSchema[0];
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
    </div>
  );
}
