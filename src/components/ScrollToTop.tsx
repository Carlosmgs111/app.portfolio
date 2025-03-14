import { useEffect } from "react";
import { useLocation } from "react-router-dom";
/**
 * Reset position scroll to top on route change 
 *  */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};
