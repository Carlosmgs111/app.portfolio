import * as React from "react";
import { SVGProps } from "react";
import styles from "./styles.module.css";
import { SVGContainer } from "./SVGContainer";
export const AxiosSVG = (props: any) => (
  <SVGContainer>
    <svg
      className={`${styles.svg} ${styles.axios}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <title>{"Axios"}</title>
      <path d="M11.068 2.9v19.397L8.954 24V7.864H4.975L11.068 2.9zM14.934 0v15.767h4.091l-6.2 5.089V1.469L14.935 0z" />
    </svg>
  </SVGContainer>
);
