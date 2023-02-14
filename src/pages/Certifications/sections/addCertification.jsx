import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import { Dashboard } from "../styles";
import { DefineSchema } from "../../../components/DefineSchema";

export const addCertification = ({
  certificationSchema,
  setElements,
  setCertifications,
  certifications,
}) => {
  const requestHeaders = headers();
  return (
    <Dashboard style={{ backgroundColor: "#9fbe05" }}>
      <DefineSchema
        {...{
          title: "Add New Certifications(s)",
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
            const { setError, setLoading, parsedSchema, reset } = params;
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
              },
              setError,
              setLoading,
            }).post(
              `certifications/certifications`,
              { certifications: parsedSchema },
              {
                ...requestHeaders,
              }
            );
            reset();
          },
        }}
      />
    </Dashboard>
  );
};
