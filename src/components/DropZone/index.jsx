import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { useDropzone } from "react-dropzone";
import { getSizesDisposition } from "../../utils";

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

  // * Use reverse method only with 'flex-direction: row'
  const filePreviewSizes = getSizesDisposition(files.length);

  return (
    <div className={styles.dropzone_container}>
      <div className={styles.dropzone_body} {...getRootProps()}>
        {files.map(
          (file, i) =>
            i >= files.length - 100 && (
              <embed
                className={styles.file_preview}
                disable={true}
                key={i}
                src={`${file}`}
                style={{
                  width: `calc(${filePreviewSizes[i][0]}% - 1rem)`,
                  height: `calc(${filePreviewSizes[i][1]}% - 1rem)`,
                }}
              />
            )
        )}
        <input style={{ overflow: "hidden" }} {...getInputProps()} />
      </div>
      <label className={styles.dropzone_label} fileIn={files.length > 0}>
        {isDragActive
          ? "Suelta el archivo aqui ..."
          : "Drag 'n' drop some files here, or click to select files"}
      </label>
    </div>
  );
}
