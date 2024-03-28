import * as React from "react";
import { SVGProps } from "react";
import styles from "./styles.module.css";
import { SVGContainer } from "./SVGContainer";
export const LogoSVG = (props: SVGProps<SVGSVGElement>) => (
  <SVGContainer>
    <svg
      className={`${styles.svg}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 145.34 115.58"
      {...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1={101.33}
          x2={133.61}
          y1={218.28}
          y2={218.28}
          gradientTransform="translate(-.258 .646)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#00a6c0" />
          <stop offset={0.5} stopColor="#00d0e5" />
          <stop offset={1} stopColor="#1cefff" />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={5.292}
        d="M130.71 218.92h-26.994m43.573 28.888-19.905-14.347 20.061-14.555m-53.778-10.252h63.723v49.557H93.667z"
        style={{
          paintOrder: "normal",
        }}
        transform="rotate(-180 168.235 274.521) scale(2.1039)"
      />
    </svg>
  </SVGContainer>
);
