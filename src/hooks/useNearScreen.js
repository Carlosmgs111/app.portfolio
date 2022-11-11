import { useState, useEffect, useRef } from "react";

typeof window.IntersectionObserver !== "undefined"
  ? window.IntersectionObserver
  : import("intersection-observer");

console.log(window.IntersectionObserver)

export const useNearScreen = (initialState = null, cb) => {
  const ref = useRef(null);
  const [show, setShow] = useState(initialState);
  // console.log({show})
  useEffect(() => {
    var observer;
    (async () => {
      observer = new window.IntersectionObserver( (entries) => {
        const { isIntersecting } = entries[0];
        setShow(isIntersecting);
        if (cb) cb(ref.current.id, isIntersecting);
      }, {threshold: 0.5});
      if (ref.current instanceof Element) observer.observe(ref.current);
    })();
    return () => observer?.disconnect();
  }, [ref]);
  return [show, ref];
};
