import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url: string, cb: Function) {
  const [error, setError]: any = useState(null);
  const [loading, setLoading]: any = useState(true);
  const [data, setData]: any = useState("");

  const fetch: any = async (url: string, cb: Function) => {
    try {
      const { data } = await axios.get(url);
      // console.log({ data });
      setData(data);
      if (cb) cb(data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch(url);
  }, [url]);

  const refetch = (url: string, cb: Function) => {
    console.log({ cb });
    fetch(url, cb);
  };

  return [data, refetch, loading, error];
}
