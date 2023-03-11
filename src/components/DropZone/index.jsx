import React, { useCallback, useState } from "react";
import { DropzoneBody, DropzoneLabel, FilePreview } from "./styles";
import { useDropzone } from "react-dropzone";

export function Dropzone({ files, setFiles }) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        files.push(binaryStr);
        setFiles([...files]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropzoneBody {...getRootProps()}>
      {files.map(
        (file, i) =>
          i >= files.length - 4 && (
            <FilePreview
              disable={true}
              key={i}
              src={`${file}`}
            />
          )
      )}
      <input {...getInputProps()} />
      <DropzoneLabel fileIn={files.length > 0}>
        {isDragActive
          ? "Suelta el archivo aqui ..."
          : "Drag 'n' drop some files here, or click to select files"}
      </DropzoneLabel>
    </DropzoneBody>
  );
}
