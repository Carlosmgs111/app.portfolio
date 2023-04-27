import config from "../config/config";
import { connect } from "socket.io-client";

export const URL =
  config.devUrl || "https://coreportfolio-production.up.railway.app/";
export const URL_API =
  config.devUrlApi || "https://coreportfolio-production.up.railway.app/api/v1";

export const socket = connect("ws://127.0.0.1:7081");

socket.on("connect", () => console.log("Connected ..."));
