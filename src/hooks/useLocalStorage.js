import { useState, useCallback } from "react";

export const useLocalStorage = (key, initialValue) => {

  const getValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  }, [initialValue, key]);
  
  const [storedValue, setValue] = useState(getValue());

  const setLocalStorage = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setLocalStorage];
};
