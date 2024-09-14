import { DefineForms } from "../../../components/DefineForms";
import { runRequest} from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import styles from "../styles.module.css";

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
              setError: (e: any) =>
                setError(new Error(e.response.data.message)),
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
