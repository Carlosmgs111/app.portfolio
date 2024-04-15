import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import styles from "../styles.module.css";
import { DefineForms } from "../../../components/DefineForms";

export const addCertification = ({
  certificationSchema,
  setCertifications,
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
            const { setError, setLoading, data, reset } = params;

            runRequest({
              setData: (data: any) => {
                setCertifications([
                  ...certifications,
                  ...data.map((c: any) => ({ ...c, visible: true })),
                ]);
                setCurrentModal(null);
                reset();
              },
              setError,
              setLoading,
            }).post(
              `certifications/certifications`,
              { certifications: data },
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
