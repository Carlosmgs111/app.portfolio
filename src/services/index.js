import config from "../config/config";
import { connect } from "socket.io-client";

const URL = config.devUrl || "https://coreportfolio-production.up.railway.app/";
const URL_API = config.devUrlApi || "https://coreportfolio-production.up.railway.app/api/v1";

export const socket = connect("ws://127.0.0.1:7081");

export { URL, URL_API };
