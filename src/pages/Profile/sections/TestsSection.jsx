import { useState, useEffect } from "react";
import { runRequest } from "../../../services/runRequest";
import { headers } from "../../../services/configs";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function TestsSection() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const requestHeaders = headers();
  useEffect(() => {}, []);
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        width: "30%",
        alignSelf: "center",
        minHeight: "30rem",
        flexDirection: "column",
        alignItems: "center",
        gap: "4rem",
        // justifyContent: "center",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center" }}>Seccion de pruebas</h1>
      {loading && (
        <Stack spacing={1}>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{
              backdropFilter: "brightness(80%) blur(0.8rem);",
              width: "768px",
              height: "768px",
              borderRadius: "0.8rem",
            }}
          />
        </Stack>
      )}
      {image && !loading && (
        <img
          style={{ width: "768px", height: "768px" }}
          src={`data:image/png;base64,${image}`}
        />
      )}
      <textarea
        style={{ width: "100%", height: "fit-content", fontSize: "1.4rem" }}
        type="text"
        value={prompt}
        spellCheck="false"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        style={{
          width: "fit-content",
          fontSize: "1.4rem",
        }}
        onClick={async () => {
          await runRequest({
            setData: setImage,
            setLoading,
          }).post(
            "images/generate",
            {
              prompt,
            },
            { ...requestHeaders }
          );
        }}
      >
        Generate Image
      </button>
    </div>
  );
}
