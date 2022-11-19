import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url, cb) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  const fetch = async (url, cb) => {
    try {
      const { data } = await axios.get(url);
      // console.log({ data });
      setData(data);
      if (cb) cb(data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetch(url)
  }, [url]);

  const refetch = (url, cb)=>{
    console.log({cb})
    fetch(url, cb)
  }

  return [data, refetch, loading, error];
}
