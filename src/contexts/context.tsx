import { createContext, useContext, Children, cloneElement, useEffect } from "react";
import { useReduceState } from "../hooks/useReduceState";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { isPrimitiveValue, Mapfy } from "../utils";

export const StateContext: any = createContext(null);

export const StateProvider = ({ initialState, children }: any) => {
  const storageManage: any = {};
  const recoveredState: any = { ...initialState };
  Mapfy(initialState).forEach((state: any, key: any) => {
    const [storedValue, setStoredValue] = useLocalStorage(key, state);
    storageManage[key] = { storedValue, setStoredValue };
    recoveredState[key] = storedValue;
  });
  return (
    <StateContext.Provider
      value={useReduceState(recoveredState, (key: any, value: any) => {
        if (!isPrimitiveValue(value)) return;
        if (!storageManage[key]) return;
        storageManage[key].setStoredValue(value);
      })}
    >
      {children
        ? Children.toArray(children).map((child: any) =>
            cloneElement(child, { withcontext: "true" })
          )
        : null}
    </StateContext.Provider>
  );
};
export const useStateValue = () => [...useContext<any>(StateContext)];
