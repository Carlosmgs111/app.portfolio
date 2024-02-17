import styles from "../styles.module.css";
import { DefineSchema } from "../../../components/DefineSchema";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";

export const addInstitution = ({
  setInstitutions,
  institutions,
  institutionSchema,
}: any) => {
  const requestHeaders = headers();
  return (
    <div className={styles.dashboard}>
      <DefineSchema
        {...{
          title: "Add New Institution(s)",
          baseSchema: institutionSchema,
          nonOptionals: ["name", "businessName", "descriptions", "urls"],
          onClickHandler: ({ setError, setLoading, data, reset }: any) => {
            runRequest({
              setData: (data: any) =>
                setInstitutions([...institutions, ...data]),
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
