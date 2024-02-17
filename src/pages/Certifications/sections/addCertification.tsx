import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import styles from "../styles.module.css";
import { DefineSchema } from "../../../components/DefineSchema";

export const addCertification = ({
  certificationSchema,
  setElements,
  setCertifications,
  certifications,
  setCurrentModal,
}: any) => {
  const requestHeaders = headers();
  return (
    <div className={styles.dashboard} style={{ backgroundColor: "#9fbe05" }}>
      <DefineSchema
        {...{
          title: "",
          baseSchema: certificationSchema,
          nonOptionals: [
            "title",
            "emitedAt~",
            "image",
            "url",
            "emitedBy{",
            "tags",
          ],
          onClickHandler: (params: any) => {
            const { setError, setLoading, data, reset } = params;

            runRequest({
              setData: (data: any) => {
                setCertifications([
                  ...certifications,
                  ...data.map((c: any) => ({ ...c, visible: true })),
                ]);
                setElements([
                  ...certifications.map((c: any) => c.title),
                  ...data.map((c: any) => c.title),
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
