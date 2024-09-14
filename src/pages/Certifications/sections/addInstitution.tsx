import styles from "../styles.module.css";
import { DefineForms } from "../../../components/DefineForms";
import { runRequest} from "../../../services/runRequest";
import { headers } from "../../../services/configs";

export const addInstitution = ({
  setInstitutions,
  institutions,
  institutionSchema,
}: any) => {
  const requestHeaders = headers();
  return (
    <div className={styles.dashboard}>
      <DefineForms
        {...{
          baseSchema: institutionSchema,
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
