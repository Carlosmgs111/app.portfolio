import styles from "../styles.module.css";
import { DefineForms } from "../../../components/DefineForms";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import { v4 as uuidv4 } from "uuid";

export const addInstitution = ({
  dispatch,
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
                dispatch({ institutions: [...institutions, ...data] }),
              setError,
              setLoading,
            }).post(
              `institutions`,
              { ...data[0], uuid: uuidv4() },
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
};
