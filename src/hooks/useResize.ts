"use client";
import { useEffect, useRef } from "react";

// ? apparently this is a good implementation but must
// ? be implemented a timing control mechanism
export const useResizeHTMLElement = <LegacyRef>(
  callback: Function,
  deps: Array<any> = [],
  $ref = null
) => {
  const nativeRef = useRef(null);
  const ref = $ref || nativeRef;
  let prevWidth: any, prevHeight: any;
  let resizeObserver: any;

  useEffect(() => {
    if (ref.current) resizeObserver.observe(ref.current);
  }, Array([ref], deps));
  // TODO .WATCH
  if (typeof window === "undefined") return;
  try {
    resizeObserver = new ResizeObserver(async (entries) => {
      const { width, height } = entries[0].contentRect;
      if (prevHeight !== height || prevWidth !== width) callback();
      prevHeight = height;
      prevWidth = width;
    });
  } catch (e) {
    console.log(e);
  }

  return ref;
};
