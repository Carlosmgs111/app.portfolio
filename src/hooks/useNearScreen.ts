import { useState, useEffect, useRef } from "react";

typeof window.IntersectionObserver !== "undefined"
  ? window.IntersectionObserver
  : import("intersection-observer");

export const useNearScreen = (
  initialState: any = null,
  cb: Function | null = null
) => {
  const ref: any = useRef(null);
  const [show, setShow] = useState(initialState);
  useEffect(() => {
    var observer: any;
    const setObserver = (current: any) => {
      observer = new window.IntersectionObserver(
        (entries) => {
          const { isIntersecting }: any = entries[0];
          setShow(isIntersecting);
          if (cb) cb(current.id, isIntersecting);
        },
        { threshold: 0.5 }
      );
      if (current instanceof Element) observer.observe(current);
    };
    setObserver(ref.current);
    return () => observer?.disconnect();
  }, [ref]);
  return [show, ref];
};

export const useNearScreenArray = (
  initialState: any = null,
  cb: Function | null = null
) => {
  const refs: any = useRef(initialState.map(() => ({ current: null })));
  const [show, setShow] = useState(initialState);
  useEffect(() => {
    var observers: any = [];
    const setObserver = (current: any, index: any) => {
      observers[index] = new window.IntersectionObserver(
        (entries) => {
          const { isIntersecting }: any = entries[0];
          show.splice(index, 0, isIntersecting);
          setShow([...show]);
          if (cb) cb(current.id, isIntersecting);
        },
        { threshold: 0.5 }
      );
      if (current instanceof Element) observers[index].observe(current);
    };
    refs.current.forEach((ref: any, index: any) => {
      setObserver(ref.current, index);
    });
    return () => observers.forEach((observer: any) => observer?.disconnect());
  }, [refs]);

  return [show, refs];
};
