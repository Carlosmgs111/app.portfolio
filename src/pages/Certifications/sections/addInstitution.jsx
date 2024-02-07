import styles from "../styles.module.css"
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
    <div className={styles.dashboard}>
      <DefineSchema
        {...{
          title: "Add New Institution(s)",
          baseSchema: institutionSchema,
          nonOptionals: ["name", "businessName", "descriptions", "urls"],
          onClickHandler: ({ setError, setLoading, data, reset }) => {
            runRequest({
              setData: (data) => setInstitutions([...institutions, ...data]),
              setError,
              setLoading,
            }).post(`institutions`, data[0], {
              ...requestHeaders,
            });
            reset();
          },
        }}
      />
    </div>
  );
};
