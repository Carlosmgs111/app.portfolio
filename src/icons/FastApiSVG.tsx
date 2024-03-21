import * as React from "react";
import { SVGProps } from "react";
import styles from "./styles.module.css";
export const fastApiSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={`${styles.svg} ${styles.fastapi}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <title>{"FastAPI"}</title>
    <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" />
  </svg>
);