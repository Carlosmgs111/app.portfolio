import { useReducer } from "react";

export const useReduceState = (initialState: any, onUpdate: any = null) => {
  const [state, dispatch]: any = useReducer((prevState: any, payload: any) => {
    if (!payload) return prevState;
    Object.entries(payload).forEach(([key, value]: any) => {
      if (key === "reset" && value) {
        return initialState;
      }
      onUpdate && onUpdate(key, value);
      prevState = { ...prevState, [key]: value };
    });
    return prevState;
  }, initialState);

  return [state, dispatch];
};
