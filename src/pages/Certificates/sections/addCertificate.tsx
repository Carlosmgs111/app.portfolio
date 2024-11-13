import { DefineForms } from "../../../components/DefineForms";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import styles from "../styles.module.css";
import { v4 as uuidv4 } from "uuid";

export const addCertificate = ({
  certificationSchema,
  dispatch,
  certificates,
}: any) => {
  const requestHeaders = headers();
  return (
    <div className={styles.dashboard}>
      <DefineForms
        {...{
          baseSchema: certificationSchema,
          onClickHandler: (params: any) => {
            let { setError, setLoading, data, reset } = params;
            runRequest({
              setData: (data: any) => {
                dispatch({
                  certificates: [
                    ...certificates,
                    ...data.map((c: any) => ({ ...c, visible: true })),
                  ],
                });
                dispatch({ currentModal: null });
                reset();
              },
              setError: (e: any) =>
                setError(new Error(e.response.data.message)),
              setLoading,
            }).post(
              `certificates/certificates`,
              { certificates: [{ ...data[0], uuid: uuidv4() }] },
              {
                ...requestHeaders,
              }
            );
          },
        }}
      />
    </div>
  );
};
