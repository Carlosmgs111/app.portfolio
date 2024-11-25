import { useReducer } from "react";
import deepEqual from "fast-deep-equal";

export const useReduceState = (initialState: any, onChange: any = null) => {
  const [state, dispatch]: any = useReducer((prevState: any, payload: any) => {
    if (!payload) return prevState;
    Object.entries(payload).forEach(([key, value]: any) => {
      if (key === "reset" && value) {
        return initialState;
      }
      onChange && onChange(key, value);
      prevState = { ...prevState, [key]: value };
    });
    return prevState;
  }, initialState);

  const conditionalDispatch = (payload: any) => {
    Object.entries(payload).forEach(([key, value]: any) => {
      if (key.startsWith("$")) { // * '$' to force update, this when time between update is too short 
        delete payload[key];
        payload[key.slice(1)] = value;
        return;
      }
      if (deepEqual(state[key], value)) {
        delete payload[key];
      }
    });
    if (!Object.keys(payload).length) return;
    return dispatch(payload);
  };

  return [state, conditionalDispatch];
};
