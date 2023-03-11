import React, { useState } from "react";
import { Dropzone } from "../../../../../components/DropZone";

export function MyDropzone() {
  const [files, setFiles] = useState([]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Dropzone {...{ files, setFiles }} />
    </div>
  );
}
