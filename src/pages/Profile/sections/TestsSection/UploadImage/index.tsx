import React, { useState } from "react";
import { Dropzone } from "../../../../../components/DropZone";
import { runRequest} from "../../../../../services/runRequest";
import { headers } from "../../../../../services/configs";

export function MyDropzone() {
  const [files, setFiles] = useState([]);
  const requestHeaders = headers();

  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Dropzone {...{ files, setFiles }} />
      <button
        onClick={() => {
          runRequest().post(
            "images/modifyimages",
            { images: files.map((file: any) => file.split(",")[1]) },
            {
              ...requestHeaders,
            }
          );
        }}
      >
        Send
      </button>
    </div>
  );
}
