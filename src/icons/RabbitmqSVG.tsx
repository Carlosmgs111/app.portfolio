import * as React from "react";
import { SVGProps } from "react";
import styles from "./styles.module.css";
export const RabbitmqSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={`${styles.svg} ${styles.rabbitmq}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <title>{"RabbitMQ"}</title>
    <path d="M23.035 9.601h-7.677a.956.956 0 0 1-.962-.962V.962a.956.956 0 0 0-.962-.956H10.56a.956.956 0 0 0-.962.956V8.64a.956.956 0 0 1-.962.962H5.762a.956.956 0 0 1-.961-.962V.962A.956.956 0 0 0 3.839 0H.959a.956.956 0 0 0-.956.962v22.076A.956.956 0 0 0 .965 24h22.07a.956.956 0 0 0 .962-.962V10.58a.956.956 0 0 0-.962-.98zm-3.86 8.152a1.437 1.437 0 0 1-1.437 1.443h-1.924a1.437 1.437 0 0 1-1.436-1.443v-1.917a1.437 1.437 0 0 1 1.436-1.443h1.924a1.437 1.437 0 0 1 1.437 1.443z" />
  </svg>
);