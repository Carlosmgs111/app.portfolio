import config from "../config/config";
const URL = config.devUrl || "https://graphenum.herokuapp.com";
const URL_API = config.devUrlApi || "https://graphenum.herokuapp.com/api";
const URL_GRAPHQL =
  config.devUrlGraphql || "https://graphenum.herokuapp.com/graphql";
const URL_SYNAPSE =
  config.devUrlSynapse || "https://graphenum.herokuapp.com/synapse";

export { URL, URL_API, URL_GRAPHQL, URL_SYNAPSE };
