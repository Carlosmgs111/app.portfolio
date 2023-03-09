import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function MyDropzone() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log({ acceptedFiles });
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        minWidth: "30%",
        height: "30rem",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        textAlign: "center",
        borderRadius: "4rem",
        backgroundColor: "#c7c7c7",
        backdropFilter:"brightness(100%)"
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <button
        style={{
          backgroundColor: "#0e8fdf",
          fontSize: "2rem",
          borderRadius: "1rem",
          padding: "1rem",
          fontWeight: "1000",
        }}
      >
        Cargar Imagen
      </button>
      <i
        style={{
          fontWeight: "500",
          color: "black",
        }}
      >
        {isDragActive
          ? "Drop the files here ..."
          : "Drag 'n' drop some files here, or click to select files"}
      </i>
    </div>
  );
}
