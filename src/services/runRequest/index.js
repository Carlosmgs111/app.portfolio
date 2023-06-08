import { URL_API } from "..";
import axios from "axios";

const methods = Object.freeze(["get", "post", "put", "patch", "delete"]);

export function runRequest({ setData, setLoading, setError } = {}) {
  const _fetch = async (method, ...args) => {
    let data = null;
    let error = null;
    let loading = true;

    setLoading && setLoading(true);
    args[0] = `${URL_API}/${args[0]}`;
    try {
      data = (await method(...args)).data;
    } catch (e) {
      error = e;
      setError && setError(error);
    } finally {
      setLoading && setLoading(false);
    }

    setData && !error && setData(data);
    loading = false;

    return [data, loading, error];
  };

  return Object.fromEntries(
    methods.map((method) => [
      method,
      (...args) => _fetch(axios[method], ...args),
    ])
  );
}
