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
  let ping = 0;
  return (
    <div className={styles.dashboard}>
      <DefineForms
        {...{
          baseSchema: certificationSchema,
          onClickHandler: (params: any) => {
            let { setError, setLoading, data, reset } = params;
            data = data.map((d: any) => ({ ...d, uuid: uuidv4() }));
            ping = new Date().getTime();
            runRequest({
              setData: (data: any) => {
                ping = new Date().getTime() - ping;
                dispatch({
                  certificates: [
                    ...certificates,
                    ...data.map((c: any) => ({ ...c, visible: true })),
                  ],
                });
                reset();
                console.log({ ping });
                dispatch({ $currentModal: null });
                ping = 0;
              },
              setError: (e: any) =>
                setError(new Error(e.response.data.message)),
              setLoading,
            }).post(
              `certificates/certificates`,
              { certificates: [ ...data ] },
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
