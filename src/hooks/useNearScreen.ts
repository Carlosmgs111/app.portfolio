import { useState, useEffect, useRef } from "react";

typeof window.IntersectionObserver !== "undefined"
  ? window.IntersectionObserver
  : import("intersection-observer");

export const useNearScreen = (initialState: any = null, cb: Function) => {
  const ref: any = useRef(null);
  const [show, setShow] = useState(initialState);
  // console.log({show})
  useEffect(() => {
    var observer: any;
    (async () => {
      observer = new window.IntersectionObserver(
        (entries) => {
          const { isIntersecting }: any = entries[0];
          setShow(isIntersecting);
          if (cb) cb(ref.current.id, isIntersecting);
        },
        { threshold: 0.5 }
      );
      if (ref.current instanceof Element) observer.observe(ref.current);
    })();
    return () => observer?.disconnect();
  }, [ref]);
  return [show, ref];
};
