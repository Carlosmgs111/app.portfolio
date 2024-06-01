import config from "../config";
import { SocketService as SS } from "./SocketService";

export const URL = config.devUrl || config.prodUrl;
export const URL_API =
  config.devUrlApi || `${config.prodUrl}/api/${config.prodApiVersion}`;

export const URL_WS =
  config.devUrl?.replace(":7080", ":7081") ||
  config.prodUrl?.replace("/", ":7081");

export const SocketService = new SS(/* [
  { imageService: "http://127.0.0.1:7081" },
] */).addClient({ imageService: URL_WS });
