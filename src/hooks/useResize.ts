"use client";
import { useEffect, useRef, useState } from "react";

// ? apparently this is a good implementation but must
// ? be implemented a timing control mechanism
export const useResizeHTMLElement = <LegacyRef>(
  callback: Function,
  deps: Array<any> = [],
  $ref = null
) => {
  const nativeRef = useRef(null);
  const ref = $ref || nativeRef;
  const [prevWidth, setPrevWidth] = useState(0);
  const [prevHeight, setPrevHeight]: any = useState(0);
  let resizeObserver: any;

  useEffect(() => {
    if (!ref.current) return;
    resizeObserver.observe(ref.current);
  }, [...deps, ref]);
  // TODO .WATCH
  if (typeof window === "undefined") return;
  try {
    resizeObserver = new ResizeObserver(async (entries) => {
      const { width, height } = entries[0].contentRect;
      console.log({ width, height, prevWidth, prevHeight });
      if (prevHeight !== height || prevWidth !== width) callback();
      setPrevHeight(height);
      setPrevWidth(width);
    });
  } catch (e) {
    console.log(e);
  }

  return ref;
};
