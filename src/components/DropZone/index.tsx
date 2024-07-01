import React, { Children, useCallback } from "react";
import styles from "./styles.module.css";
import { useDropzone } from "react-dropzone";
import { getSizesDisposition } from "../../utils";

const FilesPreview = ({ children }: any): any => {
  const files = Children.toArray(children);

  // * Use reverse method only with 'flex-direction: row'
  const filePreviewSizes = getSizesDisposition(files.length);

  return files.map(
    (file: any, i: number) =>
      i >= files.length - 16 && (
        <embed
          className={styles.file_preview}
          key={i}
          src={`${file}`}
          style={{
            width: `calc(${filePreviewSizes[i][0]}% - 1rem)`,
            height: `calc(${filePreviewSizes[i][1]}% - 1rem)`,
          }}
        />
      )
  );
};

export function Dropzone({ files, setFiles }: any) {
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
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
    <div className={styles.dropzone_container}>
      <div className={styles.dropzone_body} {...getRootProps()}>
        <FilesPreview>{files}</FilesPreview>
        <input style={{ overflow: "hidden" }} {...getInputProps()} />
      </div>
      <label
        className={styles.dropzone_label.concat(
          " ",
          files.length > 0 ? "" : styles.file_in
        )}
      >
        {isDragActive
          ? "Suelta el archivo aqui ..."
          : "Drag 'n' drop some files here, or click to select files"}
      </label>
    </div>
  );
}
