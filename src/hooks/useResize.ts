import { useEffect, useRef, useCallback } from "react";

type ResizeCallback = () => void;

export const useResizeHTMLElement = <T extends HTMLElement>(
  callback: ResizeCallback,
  deps: Array<any> = [],
  throttleMs: number = 100 // Configurable control de tiempo
) => {
  const ref = useRef<HTMLDivElement| null>(null);
  const prevSize = useRef({ width: 0, height: 0 });
  const resizeObserver = useRef<ResizeObserver | null>(null);

  const throttledCallback = useCallback(() => {
    const current = ref.current;
    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    if (
      prevSize.current.width !== width ||
      prevSize.current.height !== height
    ) {
      callback();
      prevSize.current = { width, height };
    }
  }, [callback]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeObserver.current) resizeObserver.current.disconnect();
      resizeObserver.current = new ResizeObserver(() => throttledCallback());
      if (ref.current) resizeObserver.current.observe(ref.current);
    };

    handleResize(); // Set up the observer initially

    return () => {
      resizeObserver.current?.disconnect();
    };
  }, [throttledCallback, ...deps]); // Ensure dependencies are handled correctly

  return ref;
};
