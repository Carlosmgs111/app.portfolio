import { Dashboard } from "../styles";
import { DefineSchema } from "../../../components/DefineSchema";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";

export const addInstitution = ({
  setInstitutions,
  institutions,
  institutionSchema,
}) => {
  const requestHeaders = headers();
  return (
    <Dashboard>
      <DefineSchema
        {...{
          title: "Add New Institution(s)",
          baseSchema: institutionSchema,
          nonOptionals: ["name", "businessName", "descriptions", "urls"],
          onClickHandler: ({ setError, setLoading, parsedSchema, reset }) => {
            runRequest({
              setData: (data) => setInstitutions([...institutions, ...data]),
              setError,
              setLoading,
            }).post(`institutions`, parsedSchema[0], {
              ...requestHeaders,
            });
            reset();
          },
        }}
      />
    </Dashboard>
  );
};
