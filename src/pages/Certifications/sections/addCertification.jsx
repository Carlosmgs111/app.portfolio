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
}) => {
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
          onClickHandler: (params) => {
            const { setError, setLoading, data, reset } = params;

            runRequest({
              setData: (data) => {
                setCertifications([
                  ...certifications,
                  ...data.map((c) => ({ ...c, visible: true })),
                ]);
                setElements([
                  ...certifications.map((c) => c.title),
                  ...data.map((c) => c.title),
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
