import { createContext, useContext, Children, cloneElement } from "react";
import { useReduceState } from "../hooks/useReduceState";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { isPrimitiveValue, Mapfy } from "../utils";

const Recovered = ({ key, state, storageManage, recoveredState }: any) => {
  const [storedValue, setStoredValue] = useLocalStorage(key, state);
  storageManage[key] = { storedValue, setStoredValue };
  recoveredState[key] = storedValue;
};

export const StateContext: any = createContext(null);

export const StateProvider = ({ initialState, children }: any) => {
  const storageManage: any = {};
  const recoveredState: any = { ...initialState };
  Mapfy(initialState).forEach((state: any, key: any) => {
    Recovered({ key, state, storageManage, recoveredState });
  });
  return (
    <StateContext.Provider
      value={useReduceState(recoveredState, {
        onChange: (key: any, value: any) => {
          if (!isPrimitiveValue(value)) return;
          if (!storageManage[key]) return;
          storageManage[key].setStoredValue(value);
        },
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
export const useStateValue = () => {
  const [state, dispatch] = useContext<any>(StateContext);
  return [state, dispatch];
};
