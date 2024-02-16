import config from "../config";
import { SocketService as SS } from "./SocketService";

export const URL =
  config.devUrl || "https://coreportfolio-production.up.railway.app/";
export const URL_API =
  config.devUrlApi || "https://coreportfolio-production.up.railway.app/api/v1";

export const SocketService = new SS(/* [
  { imageService: "http://127.0.0.1:7081" },
] */).addClient({ imageService: "http://127.0.0.1:7081" });
