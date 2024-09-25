import { DefineForms } from "../../../components/DefineForms";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import styles from "../styles.module.css";
import { v4 as uuidv4 } from "uuid";

export const addCertificate = ({
  certificationSchema,
  setCertificates,
  certifications,
  setCurrentModal,
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
                setCertificates([
                  ...certifications,
                  ...data.map((c: any) => ({ ...c, visible: true })),
                ]);
                setCurrentModal(null);
                reset();
              },
              setError: (e: any) =>
                setError(new Error(e.response.data.message)),
              setLoading,
            }).post(
              `certifications/certifications`,
              { certifications: [{ ...data[0], uuid: uuidv4() }] },
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
