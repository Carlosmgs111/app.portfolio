import * as React from "react";
import { SVGProps } from "react";
import styles from "./styles.module.css";
import { SVGContainer } from "./SVGContainer";
export const SocketioSVG = (props: SVGProps<SVGSVGElement>) => (
  <SVGContainer>
    <svg
      className={`${styles.svg} ${styles.socketio}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <title>{"Socket.io"}</title>
      <path d="M11.936.014a12.17 12.17 0 0 0-2.975.378C4.281 1.555.568 5.794.091 10.602c-.59 4.548 1.709 9.285 5.644 11.634 3.861 2.418 9.093 2.32 12.874-.223 3.397-2.206 5.512-6.228 5.386-10.285-.058-4.016-2.31-7.916-5.76-9.98C16.355.589 14.144.006 11.937.015zm-.063 1.696c4.945-.007 9.789 3.813 10.282 8.924.945 5.66-3.753 11.413-9.488 11.58-5.454.544-10.724-4.08-10.88-9.557-.406-4.434 2.517-8.835 6.698-10.3a9.113 9.113 0 0 1 3.388-.646zm5.091 3.224c-2.687 2.085-5.26 4.308-7.889 6.457 1.203.017 2.412.016 3.621.01 1.41-2.165 2.86-4.3 4.268-6.467zm-5.665 7.654c-1.41 2.166-2.86 4.309-4.27 6.474 2.693-2.08 5.255-4.32 7.902-6.456a255.413 255.413 0 0 0-3.632-.018z" />
    </svg>
  </SVGContainer>
);
