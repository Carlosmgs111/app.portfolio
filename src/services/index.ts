import config from "../config";
import { SocketService as SS } from "./SocketService";

export const URL = config.devUrl || config.prodUrl;
export const URL_API =
  config.devUrlApi || `${config.prodUrl}/api/${config.prodApiVersion}`;

console.log({ URL, URL_API });

export const SocketService = new SS(/* [
  { imageService: "http://127.0.0.1:7081" },
] */).addClient({ imageService: "http://127.0.0.1:7081" });
